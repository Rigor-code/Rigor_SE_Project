import { Request, Response } from "express";
import Truck from "../models/truck";
import Trucker from "../models/trucker";
// 🟢 Get all trucks
export const getAllTrucks = async (req: Request, res: Response): Promise<void> => {
    try {
        const trucks = await Truck.find();
        res.status(200).json(trucks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch trucks", details: error });
    }
};
// 🟣 Create a new truck with auto-incremented truck_id
export const createTruck = async (req: Request, res: Response): Promise<void> => {
    try {
        const { license_plate, chassis_number, capacity, assigned_trucker_id } = req.body;

        // ✅ Ensure required fields are provided
        if (!license_plate || !chassis_number || !capacity) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        // ✅ Ensure assigned_trucker_id is a valid number (if provided)
        if (assigned_trucker_id && typeof assigned_trucker_id !== "number") {
            res.status(400).json({ error: "assigned_trucker_id must be a number" });
            return;
        }

        // ✅ Find the current maximum truck_id in the database
        const maxTruck = await Truck.findOne().sort({ truck_id: -1 }); 
        const newTruckId = maxTruck ? maxTruck.truck_id + 1 : 1; // If no trucks exist, start from 1

        // ✅ Create new truck instance with the new truck_id
        const newTruck = new Truck({
            truck_id: newTruckId,
            license_plate,
            chassis_number,
            capacity,
            assigned_trucker_id: assigned_trucker_id || undefined, // Store only if provided
        });

        await newTruck.save();
        res.status(201).json(newTruck);
    } catch (error) {
        res.status(400).json({ error: "Failed to create truck", details: error });
    }
};

// 🟢 Get truck by assigned_trucker_id
export const getTruckByTruckerId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { truckerId } = req.params;
        const truck = await Truck.findOne({ assigned_trucker_id: Number(truckerId) });

        if (!truck) {
            res.status(404).json({ error: "Truck not found for this trucker ID" });
            return;
        }

        res.status(200).json(truck);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch truck", details: error });
    }
};

export const getTruckersWithoutTruck = async (req: Request, res: Response): Promise<void> => {
    try {
      // Step 1: Get all truckers
      const allTruckers = await Trucker.find();
      
      // Step 2: Get all trucks with assigned truckers
      const assignedTrucks = await Truck.find({ assigned_trucker_id: { $ne: null } });
      
      // Step 3: Extract all assigned trucker IDs
      const assignedTruckerIds = assignedTrucks.map(truck => truck.assigned_trucker_id);
      
      // Step 4: Filter out truckers who don't have assigned trucks
      const unassignedTruckers = allTruckers.filter(
        trucker => !assignedTruckerIds.includes(trucker.trucker_id)
      );
      
      if (unassignedTruckers.length === 0) {
        res.status(404).json({ message: "No unassigned truckers found" });
        return;
      }
      
      res.status(200).json(unassignedTruckers);
    } catch (error) {
      console.error("Error fetching unassigned truckers:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };