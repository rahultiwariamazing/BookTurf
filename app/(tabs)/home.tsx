/**
 * Home discovery screen.
 * Shows nearby turfs, quick discovery UI, and route entry to turf details.
 */
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Filter, MapPin, Search, Star } from "lucide-react-native";
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTurfStore } from "../../store/turfStore";

export default function HomeScreen() {
    const router = useRouter();
    const turfs = useTurfStore((state) => state.turfs);

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
            <StatusBar style="dark" />

            {/* Header */}
            <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-gray-100">
                <View>
                    <Text className="text-xs font-bold text-gray-500 uppercase tracking-widest">Location</Text>
                    <View className="flex-row items-center mt-0.5">
                        <MapPin size={16} color="#006400" className="mr-1" />
                        <Text className="text-lg font-bold text-gray-900">Bangalore, IND</Text>
                    </View>
                </View>
                <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
                    <Image
                        source={{ uri: "https://i.pravatar.cc/300" }}
                        className="w-10 h-10 rounded-full"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Search Bar */}
                <View className="px-6 py-4">
                    <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
                        <Search size={20} color="#9CA3AF" />
                        <Text className="flex-1 ml-3 text-gray-400">Find turfs, arenas...</Text>
                        <View className="w-px h-6 bg-gray-200 mx-3" />
                        <TouchableOpacity>
                            <Filter size={20} color="#006400" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Promo Banner */}
                <View className="px-6 mb-6">
                    <View className="bg-turf rounded-2xl p-5 relative overflow-hidden h-40 justify-center">
                        {/* Abstract Background Decoration */}
                        <View className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full" />
                        <View className="absolute -right-4 -bottom-10 w-32 h-32 bg-white/10 rounded-full" />

                        <View className="w-2/3">
                            <Text className="text-white font-bold text-xl mb-1">Weekend League</Text>
                            <Text className="text-white/80 text-sm mb-4">Register your team and win exciting prizes!</Text>
                            <TouchableOpacity className="bg-white/20 self-start px-4 py-2 rounded-lg border border-white/30">
                                <Text className="text-white font-bold text-xs uppercase">Register Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Featured Turfs */}
                <View className="px-6 mb-4 flex-row justify-between items-end">
                    <Text className="text-xl font-bold text-gray-900">Popular Turfs</Text>
                    <Text className="text-turf font-bold text-sm">View All</Text>
                </View>

                <View className="px-6 gap-6 mb-10">
                    {turfs.map((turf) => (
                        <TouchableOpacity
                            key={turf.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                            activeOpacity={0.9}
                            onPress={() => router.push({ pathname: "/turf/[id]", params: { id: turf.id } })}
                        >
                            <ImageBackground
                                source={{ uri: turf.photos?.[0]?.url }}
                                className="h-40 w-full"
                            >
                                <View className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex-row items-center">
                                    <Star size={12} color="#F59E0B" fill="#F59E0B" />
                                    <Text className="text-xs font-bold ml-1">4.8</Text>
                                </View>
                                <View className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md">
                                    <Text className="text-white text-[10px] font-bold uppercase">{turf.indoor ? "Indoor" : "Outdoor"}</Text>
                                </View>
                            </ImageBackground>

                            <View className="p-4">
                                <View className="flex-row justify-between items-start mb-1">
                                    <Text className="text-lg font-bold text-gray-900 flex-1 mr-2">{turf.name}</Text>
                                    <Text className="text-turf font-bold text-lg">₹{turf.settings?.minPricePerHour}<Text className="text-sm text-gray-400 font-normal">/hr</Text></Text>
                                </View>

                                <View className="flex-row items-center text-gray-500 mb-3">
                                    <MapPin size={14} color="#6B7280" />
                                    <Text className="text-gray-500 text-sm ml-1">{turf.address}</Text>
                                </View>

                                <View className="bg-gray-50 flex-row justify-between items-center px-3 py-2 rounded-lg border border-gray-100">
                                    <Text className="text-xs text-gray-500 font-medium">Next Available Slot</Text>
                                    <Text className="text-xs text-turf-dark font-bold">Today, 6:00 PM</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
