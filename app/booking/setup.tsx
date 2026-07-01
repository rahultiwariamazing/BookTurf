/**
 * Booking configuration and pricing screen.
 * Applies slot count, group size, and add-ons to compute final payable amount.
 */
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft, MonitorPlay, Users, Video } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useTurfStore } from "../../store/turfStore";

export default function BookingSetupScreen() {
    const { turfId, slots } = useLocalSearchParams<{ turfId: string, slots: string }>();
    const router = useRouter();
    const turf = useTurfStore((state) => state.getTurfById(turfId));

    const numSlots = parseInt(slots, 10) || 1;
    const [playerCount, setPlayerCount] = useState("12");
    const [scoreboard, setScoreboard] = useState(false);
    const [recording, setRecording] = useState(false);

    if (!turf) return null;

    // Base slot charge for the selected duration.
    const minSlotPrice = (turf.settings?.minPricePerHour || 0) * numSlots;

    const players = parseInt(playerCount) || 0;
    const perPersonTotal = players * (turf.settings?.perPersonMin || 0) * numSlots; // Simplified logic for V1

    // Final base uses whichever model is higher: slot or per-player.
    const basePrice = Math.max(minSlotPrice, perPersonTotal);

    const addOnCost =
        (scoreboard ? (turf.settings?.scoreboardRateHr || 0) : 0) * numSlots +
        (recording ? (turf.settings?.cameraRateHr || 0) : 0) * numSlots;

    const totalAmount = basePrice + addOnCost;

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />
            <SafeAreaView edges={["top"]} className="flex-1">
                <View className="px-6 py-4 border-b border-gray-100 flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()} className="mr-4">
                        <ChevronLeft size={24} color="#111827" />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold text-gray-900">Booking Details</Text>
                </View>

                <ScrollView className="flex-1 px-6 pt-6">
                    {/* Card: Players */}
                    <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm">
                        <View className="flex-row items-center mb-4">
                            <View className="w-8 h-8 rounded-full bg-turf/10 items-center justify-center mr-3">
                                <Users size={16} color="#006400" />
                            </View>
                            <Text className="text-gray-900 font-bold text-base">Group Size</Text>
                        </View>

                        <View className="flex-row items-center justify-between">
                            <Text className="text-gray-500 w-2/3">Enter expected number of players to calculate accurate pricing.</Text>
                            <Input
                                className="w-20 text-center mb-0"
                                value={playerCount}
                                onChangeText={setPlayerCount}
                                keyboardType="number-pad"
                                placeholder="0"
                            />
                        </View>
                    </View>

                    {/* Card: Add-ons */}
                    <Text className="text-gray-900 font-bold mb-4 ml-1">Add-ons</Text>

                    <View className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-6 shadow-sm">
                        {/* Scoreboard Toggle */}
                        <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
                            <View className="flex-row items-center flex-1 mr-4">
                                <MonitorPlay size={22} color="#4B5563" />
                                <View className="ml-3">
                                    <Text className="font-bold text-gray-900">Digital Scoreboard</Text>
                                    <Text className="text-xs text-gray-500">Live scoring + PDF stats</Text>
                                </View>
                            </View>
                            <View className="items-end">
                                <Switch
                                    value={scoreboard}
                                    onValueChange={setScoreboard}
                                    trackColor={{ false: "#E5E7EB", true: "#006400" }}
                                />
                                <Text className="text-xs font-bold text-gray-900 mt-1">+₹{turf.settings?.scoreboardRateHr}/hr</Text>
                            </View>
                        </View>

                        {/* Recording Toggle */}
                        <View className="flex-row items-center justify-between p-4">
                            <View className="flex-row items-center flex-1 mr-4">
                                <Video size={22} color="#4B5563" />
                                <View className="ml-3">
                                    <Text className="font-bold text-gray-900">4K Multi-Cam Rec</Text>
                                    <Text className="text-xs text-gray-500">Full match footage (USB Pickup)</Text>
                                </View>
                            </View>
                            <View className="items-end">
                                <Switch
                                    value={recording}
                                    onValueChange={setRecording}
                                    trackColor={{ false: "#E5E7EB", true: "#006400" }}
                                />
                                <Text className="text-xs font-bold text-gray-900 mt-1">+₹{turf.settings?.cameraRateHr}/hr</Text>
                            </View>
                        </View>
                    </View>

                    {/* Pricing Config Info */}
                    <View className="bg-yellow-50 p-4 rounded-xl mb-24 border border-yellow-200">
                        <Text className="text-yellow-800 font-bold text-xs uppercase mb-1">Pricing Logic Applied</Text>
                        <Text className="text-yellow-900 text-sm">
                            Min Slot Price: ₹{minSlotPrice} {"\n"}
                            Per Person Total: ₹{perPersonTotal} ({players} x ₹{turf.settings?.perPersonMin} x {numSlots}h)
                        </Text>
                        <Text className="text-yellow-900 font-bold text-sm mt-1">Final Base: ₹{basePrice} (Higher of two)</Text>
                    </View>

                </ScrollView>
            </SafeAreaView>

            {/* Footer */}
            <View className="absolute bottom-0 w-full bg-white border-t border-gray-100 px-6 py-4 pb-8 shadow-lg">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-gray-500 text-sm">Total Payable</Text>
                    <Text className="text-2xl font-extrabold text-turf">₹{totalAmount}</Text>
                </View>
                <Button
                    title="Proceed to Pay"
                    onPress={() => router.push("/booking/success")}
                />
            </View>
        </View>
    );
}
