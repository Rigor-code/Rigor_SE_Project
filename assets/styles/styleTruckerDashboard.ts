import { StyleSheet, Dimensions, PixelRatio, Platform } from 'react-native';
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#EBF4F6" },
    drawer: { backgroundColor: "#FFFFFF", width: "80%" },
    drawerContent: { flex: 1, padding: 20 },
    profileSection: {
        alignItems: "center",
        marginBottom: 30,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    profileIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#088395",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    profileIconText: { fontSize: 32, color: "#FFFFFF", fontWeight: "bold" },
    profileName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#071952",
        marginBottom: 5,
    },
    role: { fontSize: 14, color: "#37B7C3", fontWeight: "500" },
    drawerItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 8,
    },
    activeDrawerItem: { backgroundColor: "#EBF4F6" },
    drawerItemText: { fontSize: 16, color: "#071952", fontWeight: "500" },
    signOutItem: { backgroundColor: "#FF3B30", marginTop: "auto" },
    signOutText: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 16,
        textAlign: "center",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    menuButton: { padding: 8 },
    headerTitle: {
        marginLeft: 16,
        fontSize: 20,
        fontWeight: "600",
        color: "#071952",
    },
    content: { flex: 1, padding: 16 },
    contentMap: { padding: 0 },
    map: { flex: 1, borderRadius: 16 },
    mapWrapper: { flex: 1 },
    noTripsBanner: {
        position: "absolute",
        top: 20,
        alignSelf: "center",
        backgroundColor: "#071952",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    noTripsText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
    loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 16,
        marginVertical: 8,
        marginBottom: 16,
        shadowColor: Platform.OS === 'ios' ? '#000000' : '#071952',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 6,
        borderWidth: Platform.OS === 'ios' ? 0 : 1,
        borderColor: '#088395',
        transform: [{ scale: 0.98 }, { translateY: -2 }],
        overflow: 'hidden',
        borderLeftWidth: 4,
        borderLeftColor: '#088395',
        borderTopWidth: 0,
    },
    cardText: {
        fontSize: 15,
        color: "#071952",
        marginBottom: 8,
        fontWeight: "500",
        lineHeight: 20,
        paddingLeft: 8,
    },
    statusText: {
        color: "#088395",
        backgroundColor: "#EBF4F6",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        alignSelf: "flex-start",
        fontWeight: "600",
    },
    completedText: {
        color: "#37B7C3",
        backgroundColor: "#EBF4F6",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        fontWeight: "600",
        alignSelf: "flex-start",
    },
    reimbursementCard: {
        marginHorizontal: 16,
    },
    tripIdBadge: {
        backgroundColor: '#EBF4F6',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    tripIdText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#088395',
    },
    reimbursementDetails: {
        marginVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        paddingBottom: 8,
    },
    amountLabel: {
        fontSize: 12,
        color: '#64748B',
        marginBottom: 4,
        fontWeight: '500',
    },
    amountValue: {
        fontSize: 20,
        color: '#071952',
        fontWeight: '600',
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    pendingBadge: {
        backgroundColor: '#FEF2F2',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    pendingBadgeText: {
        color: '#D97706',
        fontSize: 14,
        fontWeight: '600',
    },
    completeBtn: {
        marginTop: 16,
        backgroundColor: "#088395",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    completeText: { color: "#FFFFFF", fontWeight: "600", fontSize: 16 },
    profileImageWrapper: {
        width: 70,
        height: 70,
        borderRadius: 35,
        overflow: "hidden",
        marginBottom: 10,
    },
    profileImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    contentWrapper: {
        flex: 1,
        padding: 16,
    },
    noContentText: {
        fontSize: 15,
        color: '#64748B',
        textAlign: 'center',
        marginTop: 20,
    },
    tripHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    tripRoute: {
        flex: 1,
        marginRight: 12,
    },
    routeText: {
        fontSize: 17,
        fontWeight: '700',
        color: '#071952',
        letterSpacing: 0.3,
        marginBottom: 2,
    },
    tripDetails: {
        gap: 8,
    },
    statusBadge: {
        backgroundColor: '#EBF4F6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginTop: 4,
    },
    emptyReimbursementWrapper: {
        flex: 1,
        backgroundColor: '#EFFFFF',
        alignItems: 'center',
        padding: 16,
        paddingTop: 40,
    },

    emptyCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingVertical: 24,
        paddingHorizontal: 32,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },

    emptyCardText: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
        fontWeight: '500',
    },
    reimbursementHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },

    reimbursementDate: {
        fontSize: 13,
        color: "#64748B",
        fontWeight: "500",
    },

    receiptWrapper: {
        marginTop: 12,
    },

    receiptLabel: {
        fontSize: 14,
        color: "#64748B",
        marginBottom: 4,
        fontWeight: "500",
    },

    receiptImage: {
        width: "100%",
        height: 180,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#CBD5E1",
    },

});

export default styles;