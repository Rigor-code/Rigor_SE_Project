import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { getAllTrips } from '../../services/api';
import type { Trip } from '../../services/util';
import { useIsFocused } from "@react-navigation/native";
import styles from '../../assets/styles/styleTripAnalyticsForm';

const { width } = Dimensions.get('window');

const tripAnalytics = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [minTripCount, setMinTripCount] = useState<string>('2');
  const [numRoutes, setNumRoutes] = useState<string>('3');
  const [filteredRoutes, setFilteredRoutes] = useState<{route: string, count: number}[]>([]);
  const [tripStatusData, setTripStatusData] = useState<{ name: string; count: number; color: string }[]>([]);
  const isFocused = useIsFocused();
  const minTrips = parseInt(minTripCount) || 0;
  const numTopRoutes = parseInt(numRoutes) || 0;

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const tripsData = await getAllTrips();
        if (!Array.isArray(tripsData)) {
          console.error('Invalid trips data format');
          setTrips([]);
          return;
        }
        setTrips(tripsData);
        processRoutes(tripsData);
        processTripStatus(tripsData);
      } catch (error) {
        console.error('Error fetching trips:', error);
        setTrips([]);
        setFilteredRoutes([]);
        setTripStatusData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [isFocused]);

  const processRoutes = (tripsData: Trip[]) => {
    const routeCounts = tripsData.reduce((acc, trip) => {
      const route = `${trip.start_location} → ${trip.end_location}`;
      acc[route] = (acc[route] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const routes = Object.entries(routeCounts)
      .map(([route, count]) => ({ route, count }))
      .sort((a, b) => b.count - a.count);

    setFilteredRoutes(routes.filter(route => route.count >= minTripCount));
  };

  useEffect(() => {
    processRoutes(trips);
  }, [minTripCount]);

  const processTripStatus = (tripsData: Trip[]) => {
    const statusCounts = tripsData.reduce(
      (acc, trip) => {
        if (trip.status === 'Completed') acc.completed++;
        else if (trip.status === 'Scheduled') acc.scheduled++;
        return acc;
      },
      { completed: 0, scheduled: 0 }
    );

    setTripStatusData([
      {
        name: 'Completed',
        count: statusCounts.completed,
        color: '#088395'
      },
      {
        name: 'Scheduled',
        count: statusCounts.scheduled,
        color: '#37B7C3'
      }
    ]);
  };

  const processTripsData = () => {
    if (!trips.length) return { labels: [], data: [] };

    const sortedTrips = [...trips].sort((a, b) => 
      new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
    );

    const tripsByMonth = sortedTrips.reduce((acc, trip) => {
      const date = new Date(trip.start_time);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`;
      
      if (!acc[monthYear]) {
        acc[monthYear] = { totalDistance: 0, count: 0 };
      }
      acc[monthYear].totalDistance += trip.distance;
      acc[monthYear].count++;
      return acc;
    }, {} as Record<string, { totalDistance: number; count: number }>);

    const monthlyAverages = Object.entries(tripsByMonth).map(([month, data]) => ({
      month,
      average: data.totalDistance / data.count
    }));

    return {
      labels: monthlyAverages.map(item => item.month),
      data: monthlyAverages.map(item => Number(item.average.toFixed(2)))
    };
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push('/advancedAnalytics')}
          style={styles.backButton}
        >
          <IconSymbol name="chevron.left" size={24} color="#071952" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trip Analytics</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading trip data...</Text>
          </View>
        ) : (
          <>
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Trip Status Distribution</Text>
              {tripStatusData.length > 0 && (
                <PieChart
                  data={tripStatusData.map(data => ({
                    name: data.name,
                    population: data.count,
                    color: data.color,
                    legendFontColor: '#071952',
                    legendFontSize: 12
                  }))}
                  width={width - 32}
                  height={220}
                  chartConfig={{
                    backgroundColor: '#FFFFFF',
                    backgroundGradientFrom: '#FFFFFF',
                    backgroundGradientTo: '#FFFFFF',
                    color: (opacity = 1) => `rgba(7, 25, 82, ${opacity})`,
                    style: {
                      borderRadius: 16
                    }
                  }}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  absolute
                />
              )}
            </View>
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Longest Routes</Text>
              <View style={styles.filterContainer}>
                <Text style={styles.filterLabel}>Number of Routes:</Text>
                <TextInput
                  style={styles.filterInput}
                  value={numRoutes}
                  onChangeText={setNumRoutes}
                  keyboardType="numeric"
                  placeholder="0"
                />
              </View>
              {trips.length > 0 ? (
                trips
                  .sort((a, b) => b.distance - a.distance)
                  .slice(0, numRoutes)
                  .map((trip, index) => (
                    <View key={index} style={styles.routeCard}>
                      <View style={styles.routeInfo}>
                        <Text style={styles.routeText}>
                          {trip.start_location} → {trip.end_location}
                        </Text>
                        <Text style={styles.routeDistance}>
                          {trip.distance} km
                        </Text>
                      </View>
                    </View>
                  ))
              ) : (
                <Text style={styles.noDataText}>No trip data available</Text>
              )}
            </View>

            <View style={styles.routesContainer}>
              <View style={styles.routeHeader}>
                <Text style={styles.sectionTitle}>Popular Routes</Text>
                <View style={styles.filterContainer}>
                  <Text style={styles.filterLabel}>Min Trips:</Text>
                  <TextInput
                    style={styles.filterInput}
                    value={minTripCount}
                    onChangeText={setMinTripCount}
                    keyboardType="numeric"
                    placeholder="0"
                  />
                </View>
              </View>
              {filteredRoutes.length > 0 ? (
                filteredRoutes.map((route, index) => (
                  <View key={index} style={styles.routeCard}>
                    <View style={styles.routeInfo}>
                      <Text style={styles.routeText}>{route.route}</Text>
                      <Text style={styles.tripCount}>
                        {route.count} {route.count === 1 ? 'trip' : 'trips'}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.noDataText}>No routes match the filter criteria</Text>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default tripAnalytics;
