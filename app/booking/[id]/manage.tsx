/**
 * Booking management screen.
 * Provides entry points for invites, team setup, and match start actions.
 */
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft, Play, Share2, Trophy, UserPlus, Users } from "lucide-react-native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../../components/ui/Button";

// Mock Players
const MOCK_PLAYERS = [
    { id: 1, name: "Rahul T", role: "Leader", avatar: "https://i.pravatar.cc/100?img=1" },
    { id: 2, name: "Rohit S", role: "Player", avatar: "https://i.pravatar.cc/100?img=3" },
    { id: 3, name: "Virat K", role: "Player", avatar: "https://i.pravatar.cc/100?img=4" },
    { id: 4, name: "Hardik P", role: "Player", avatar: "https://i.pravatar.cc/100?img=5" },
];

export default function ManageBookingScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    return (
        <View className="flex-1 bg-gray-50">
            <StatusBar style="dark" />
            <SafeAreaView edges={["top"]} className="flex-1">
                {/* Header */}
                <View className="px-6 py-4 bg-white border-b border-gray-100 flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <TouchableOpacity onPress={() => router.back()} className="mr-4">
                            <ChevronLeft size={24} color="#111827" />
                        </TouchableOpacity>
                        <View>
                            <Text className="text-lg font-bold text-gray-900">Manage Booking</Text>
                            <Text className="text-gray-500 text-xs">ID: {id}</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Share2 size={20} color="#006400" />
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1 p-6">

                    {/* Action Grid */}
                    <View className="flex-row gap-4 mb-6">
                        <TouchableOpacity className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-100 items-center">
                            <UserPlus size={24} color="#006400" className="mb-2" />
                            <Text className="font-bold text-gray-900">Invite</Text>
                            <Text className="text-gray-500 text-[10px] text-center">Add players</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-100 items-center">
                            <Users size={24} color="#006400" className="mb-2" />
                            <Text className="font-bold text-gray-900">Split Teams</Text>
                            <Text className="text-gray-500 text-[10px] text-center">Team A vs B</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-100 items-center">
                            <Trophy size={24} color="#006400" className="mb-2" />
                            <Text className="font-bold text-gray-900">Start Match</Text>
                            <Text className="text-gray-500 text-[10px] text-center">Toss & Play</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Player List */}
                    <View className="mb-6">
                        <View className="flex-row justify-between items-center mb-3">
                            <Text className="text-lg font-bold text-gray-900">Players ({MOCK_PLAYERS.length}/14)</Text>
                            <Text className="text-turf font-bold text-sm">+ Request More</Text>
                        </View>

                        <View className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
                            {MOCK_PLAYERS.map((player, index) => (
                                <View key={player.id} className={`flex-row items-center p-3 ${index !== MOCK_PLAYERS.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                    <Image source={{ uri: player.avatar }} className="w-10 h-10 rounded-full mr-3" />
                                    <View className="flex-1">
                                        <Text className="text-gray-900 font-bold">{player.name}</Text>
                                        <Text className="text-gray-400 text-xs">{player.role}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Need Players Request */}
                    <View className="bg-turf/5 border border-turf/20 rounded-xl p-4 flex-row items-center justify-between mb-8">
                        <View>
                            <Text className="text-turf-dark font-bold">Short on players?</Text>
                            <Text className="text-turf text-xs">Broadcast a request to nearby players</Text>
                        </View>
                        <Button title="Find" size="sm" />
                    </View>

                    {/* Matches Section */}
                    <Text className="text-lg font-bold text-gray-900 mb-3 block">Matches</Text>
                    <View className="bg-white rounded-xl overflow-hidden border border-gray-200">
                        <View className="p-4 border-b border-gray-100 flex-row justify-between items-center bg-gray-50">
                            <Text className="font-bold text-gray-900">Match 1</Text>
                            <View className="bg-green-100 px-2 py-1 rounded">
                                <Text className="text-green-800 text-[10px] font-bold uppercase">Scheduled</Text>
                            </View>
                        </View>
                        <View className="p-6 items-center justify-center">
                            <Text className="text-gray-400 text-sm mb-4">Teams not assigned yet</Text>
                            <Button
                                title="Setup Match"
                                icon={<Play size={16} color="white" />}
                                onPress={() => router.push({ pathname: "/scoring/setup", params: { bookingId: id } })}
                            />
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
