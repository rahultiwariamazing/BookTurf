/**
 * Slot selection screen for a chosen turf.
 * Lets users pick date and one or more available hourly slots.
 */
import { clsx } from "clsx";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/ui/Button";
import { useTurfStore } from "../../store/turfStore";

export default function SlotSelectionScreen() {
    const { turfId } = useLocalSearchParams<{ turfId: string }>();
    const router = useRouter();
    const turf = useTurfStore((state) => state.getTurfById(turfId));

    const [selectedDate, setSelectedDate] = useState(0); // 0 = Today, 1 = Tomorrow, etc.
    const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

    // Generates the upcoming date strip used by the slot picker.
    const dates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return {
            day: d.toLocaleDateString("en-US", { weekday: "short" }),
            date: d.getDate(),
            fullDate: d.toISOString().split("T")[0],
        };
    });

    // Mock availability matrix from 10:00 AM to 10:00 PM.
    const slots = Array.from({ length: 13 }, (_, i) => {
        const hour = 10 + i;
        const time = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? "PM" : "AM"}`;
        const isBooked = Math.random() < 0.3; // 30% mocked booked
        return { id: `slot-${hour}`, time, hour, isBooked };
    });

    // Toggles one slot id in the current selection list.
    const toggleSlot = (slotId: string) => {
        if (selectedSlots.includes(slotId)) {
            setSelectedSlots(selectedSlots.filter(id => id !== slotId));
        } else {
            setSelectedSlots([...selectedSlots, slotId]);
        }
    };

    if (!turf) return <View />;

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />
            <SafeAreaView edges={["top"]} className="flex-1">
                {/* Header */}
                <View className="px-6 py-4 border-b border-gray-100 flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()} className="mr-4">
                        <ChevronLeft size={24} color="#111827" />
                    </TouchableOpacity>
                    <View>
                        <Text className="text-lg font-bold text-gray-900">Select Slots</Text>
                        <Text className="text-gray-500 text-xs">{turf.name}</Text>
                    </View>
                </View>

                <ScrollView className="flex-1">
                    {/* Date Selector */}
                    <View className="py-6">
                        <Text className="text-gray-900 font-bold px-6 mb-4">Select Date</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
                            {dates.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setSelectedDate(index)}
                                    className={clsx(
                                        "items-center justify-center p-3 rounded-2xl mr-3 border min-w-[64px]",
                                        selectedDate === index ? "bg-turf border-turf" : "bg-white border-gray-200"
                                    )}
                                >
                                    <Text className={clsx("text-xs font-medium mb-1", selectedDate === index ? "text-white/70" : "text-gray-500")}>{item.day}</Text>
                                    <Text className={clsx("text-lg font-bold", selectedDate === index ? "text-white" : "text-gray-900")}>{item.date}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Slots Grid */}
                    <View className="px-6 mb-24">
                        <Text className="text-gray-900 font-bold mb-4">Available Slots</Text>
                        <View className="flex-row flex-wrap gap-3">
                            {slots.map((slot) => {
                                const isSelected = selectedSlots.includes(slot.id);
                                return (
                                    <TouchableOpacity
                                        key={slot.id}
                                        disabled={slot.isBooked}
                                        onPress={() => toggleSlot(slot.id)}
                                        className={clsx(
                                            "w-[30%] py-3 items-center justify-center rounded-xl border mb-2",
                                            slot.isBooked
                                                ? "bg-gray-100 border-transparent opacity-60"
                                                : isSelected
                                                    ? "bg-turf border-turf"
                                                    : "bg-white border-gray-200"
                                        )}
                                    >
                                        <Text className={clsx(
                                            "font-bold text-sm",
                                            slot.isBooked ? "text-gray-400 line-through" : isSelected ? "text-white" : "text-gray-900"
                                        )}>
                                            {slot.time}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

            {/* Footer */}
            {selectedSlots.length > 0 && (
                <View className="absolute bottom-0 w-full bg-white border-t border-gray-100 px-6 py-4 pb-8 shadow-lg">
                    <View className="flex-row justify-between items-center">
                        <View>
                            <Text className="text-gray-500 text-xs font-bold uppercase">{selectedSlots.length} Slots Selected</Text>
                            <Text className="text-xl font-extrabold text-gray-900">₹{(turf.settings?.minPricePerHour || 0) * selectedSlots.length}</Text>
                        </View>
                        <Button
                            title="Continue"
                            className="px-8"
                            onPress={() => router.push({
                                pathname: "/booking/setup",
                                params: { turfId, slots: selectedSlots.length } // Passing minimal params
                            })}
                        />
                    </View>
                </View>
            )}
        </View>
    );
}
