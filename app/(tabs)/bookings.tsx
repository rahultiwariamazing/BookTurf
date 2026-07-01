/**
 * Booking history screen.
 * Presents the user booking list and links into booking management.
 */
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Calendar, ChevronRight, Clock, Users } from "lucide-react-native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MOCK_BOOKINGS = [
    {
        id: "b-1",
        turfName: "Eden Gardens Box Cricket",
        date: "24 Jan, 2026",
        time: "6:00 PM - 8:00 PM",
        status: "confirmed",
        players: 14,
        price: "₹2400",
    },
    {
        id: "b-2",
        turfName: "Lords Turf Arena",
        date: "28 Jan, 2026",
        time: "8:00 PM - 10:00 PM",
        status: "pending",
        players: 12,
        price: "₹2800",
    }
];

export default function BookingsScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-gray-50 mb-20">
            <StatusBar style="dark" />
            <View className="px-6 py-4 bg-white border-b border-gray-100">
                <Text className="text-xl font-bold text-gray-900">My Bookings</Text>
            </View>

            <FlatList
                data={MOCK_BOOKINGS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className="bg-white rounded-xl p-4 mb-4 border border-gray-200 shadow-sm"
                        onPress={() => router.push({ pathname: "/booking/[id]/manage", params: { id: item.id } })}
                    >
                        <View className="flex-row justify-between items-start mb-3">
                            <View>
                                <Text className="text-gray-900 font-bold text-lg">{item.turfName}</Text>
                                <View className="flex-row items-center mt-1">
                                    <Calendar size={14} color="#6B7280" />
                                    <Text className="text-gray-500 text-xs ml-1">{item.date}</Text>
                                    <View className="w-1 h-1 bg-gray-300 rounded-full mx-2" />
                                    <Clock size={14} color="#6B7280" />
                                    <Text className="text-gray-500 text-xs ml-1">{item.time}</Text>
                                </View>
                            </View>
                            <View className={`px-2 py-1 rounded-md ${item.status === 'confirmed' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                                <Text className={`text-xs font-bold uppercase ${item.status === 'confirmed' ? 'text-green-800' : 'text-yellow-800'}`}>
                                    {item.status}
                                </Text>
                            </View>
                        </View>

                        <View className="flex-row justify-between items-center border-t border-gray-100 pt-3">
                            <View className="flex-row items-center">
                                <Users size={16} color="#006400" />
                                <Text className="text-gray-900 font-medium ml-2 text-sm">{item.players} Players</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Text className="text-turf font-bold mr-1">Manage</Text>
                                <ChevronRight size={16} color="#006400" />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <View className="items-center justify-center py-20">
                        <Text className="text-gray-400">No bookings yet</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
