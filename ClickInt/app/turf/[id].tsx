/**
 * Turf details screen.
 * Shows amenity, policy, and pricing information and starts booking flow.
 */
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Check, ChevronLeft, Clock, MapPin, Share2, ShieldCheck, Star } from "lucide-react-native";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/ui/Button";
import { useTurfStore } from "../../store/turfStore";

const { width } = Dimensions.get("window");

export default function TurfDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const turf = useTurfStore((state) => state.getTurfById(id));

    if (!turf) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center">
                <Text>Turf not found</Text>
            </SafeAreaView>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="light" />
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Hero Image */}
                <View className="relative">
                    <Image
                        source={{ uri: turf.photos?.[0]?.url }}
                        style={{ width: width, height: 280 }}
                        className="bg-gray-200"
                    />
                    <View className="absolute top-0 left-0 w-full h-full bg-black/30" />

                    {/* Header Actions */}
                    <SafeAreaView className="absolute top-0 w-full flex-row justify-between px-6">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full items-center justify-center border border-white/10"
                        >
                            <ChevronLeft color="white" size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full items-center justify-center border border-white/10"
                        >
                            <Share2 color="white" size={20} />
                        </TouchableOpacity>
                    </SafeAreaView>

                    {/* Title Overlay */}
                    <View className="absolute bottom-6 left-6 right-6">
                        <View className="flex-row items-center mb-2">
                            <View className="bg-turf px-2 py-1 rounded-md mr-2">
                                <Text className="text-white text-xs font-bold uppercase">{turf.indoor ? "Indoor" : "Outdoor"}</Text>
                            </View>
                            <View className="bg-yellow-500 px-2 py-1 rounded-md flex-row items-center">
                                <Star size={10} color="black" fill="black" />
                                <Text className="text-black text-xs font-bold ml-1">4.8</Text>
                            </View>
                        </View>
                        <Text className="text-white text-3xl font-extrabold shadow-sm">{turf.name}</Text>
                        <View className="flex-row items-center mt-1">
                            <MapPin size={16} color="white" className="opacity-80" />
                            <Text className="text-white/90 ml-1 text-sm font-medium">{turf.address}</Text>
                        </View>
                    </View>
                </View>

                {/* Content */}
                <View className="p-6 -mt-4 bg-white rounded-t-3xl min-h-screen">

                    {/* Amenities Grid */}
                    <Text className="text-lg font-bold text-gray-900 mb-4">Amenities</Text>
                    <View className="flex-row flex-wrap gap-3 mb-8">
                        {turf.amenities?.map((amenity) => (
                            <View key={amenity.id} className="flex-row items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                                <Check size={14} color="#006400" />
                                <Text className="text-gray-700 text-xs font-medium ml-2">{amenity.name}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Pricing Rules */}
                    <Text className="text-lg font-bold text-gray-900 mb-4">Pricing & Rules</Text>
                    <View className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                        <View className="flex-row items-center mb-3">
                            <View className="w-8 h-8 rounded-full bg-turf/10 items-center justify-center mr-3">
                                <Text className="text-turf font-bold">₹</Text>
                            </View>
                            <View>
                                <Text className="text-gray-900 font-bold">Base Price</Text>
                                <Text className="text-gray-500 text-xs">Minimum ₹{turf.settings?.minPricePerHour}/hr for the slot</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center">
                            <View className="w-8 h-8 rounded-full bg-turf/10 items-center justify-center mr-3">
                                <UserOutline />
                            </View>
                            <View>
                                <Text className="text-gray-900 font-bold">Per Person</Text>
                                <Text className="text-gray-500 text-xs">₹{turf.settings?.perPersonMin} - ₹{turf.settings?.perPersonMax} per player</Text>
                            </View>
                        </View>
                    </View>

                    {/* Policies */}
                    <Text className="text-lg font-bold text-gray-900 mb-4">Policies</Text>
                    <View className="gap-4 mb-24">
                        <PolicyItem
                            icon={<ShieldCheck size={20} color="#006400" />}
                            title="Cancellation Policy"
                            desc={`Cancel up to ${turf.settings?.cancelWindowHrs} hours before for a ${turf.settings?.refundPercent}% refund.`}
                        />
                        <PolicyItem
                            icon={<Clock size={20} color="#006400" />}
                            title="Data Retention"
                            desc={`Scores and videos are auto-deleted after ${turf.settings?.scoreRetentionHrs} hours.`}
                        />
                    </View>
                </View>
            </ScrollView>

            {/* Booking Action Bar */}
            <View className="absolute bottom-0 w-full bg-white border-t border-gray-100 px-6 py-4 pb-8 shadow-lg">
                <View className="flex-row items-center justify-between mb-2">
                    <View>
                        <Text className="text-gray-400 text-xs font-bold uppercase">Starting from</Text>
                        <Text className="text-2xl font-extrabold text-gray-900">₹{turf.settings?.minPricePerHour}<Text className="text-sm text-gray-400 font-normal">/hr</Text></Text>
                    </View>
                    <Button
                        title="Book Now"
                        size="lg"
                        className="px-10"
                        onPress={() => router.push({ pathname: "/booking/slots", params: { turfId: turf.id } })}
                    />
                </View>
            </View>
        </View>
    );
}

function PolicyItem({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    // Reusable row for policy highlights in the details section.
    return (
        <View className="flex-row items-start">
            <View className="mt-0.5">{icon}</View>
            <View className="ml-3 flex-1">
                <Text className="text-gray-900 font-bold text-sm">{title}</Text>
                <Text className="text-gray-500 text-xs leading-5 mt-0.5">{desc}</Text>
            </View>
        </View>
    )
}

function UserOutline() {
    // Simple icon fallback used in pricing rows.
    return <View className="w-4 h-4 rounded-full border-2 border-turf" />
}
