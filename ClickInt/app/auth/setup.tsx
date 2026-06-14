/**
 * Post-login profile onboarding screen.
 * Captures basic profile metadata required for bookings and social flows.
 */
import { useRouter } from "expo-router";
import { Camera } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useUserStore } from "../../store/userStore";

export default function ProfileSetupScreen() {
    const router = useRouter();
    const updateProfile = useUserStore((state) => state.updateProfile);

    const [name, setName] = useState("");
    const [city, setCity] = useState("");

    // Saves profile details and transitions into the main app tabs.
    const handleSubmit = () => {
        if (!name || !city) return;
        updateProfile({ name, city });
        router.replace("/(tabs)/home");
    };

    return (
        <SafeAreaView className="flex-1 bg-white p-6 justify-between">
            <View>
                <Text className="text-3xl font-extrabold text-gray-900 mb-2">Create Profile</Text>
                <Text className="text-gray-500 mb-8">Tell us a bit about yourself to get started.</Text>

                <View className="items-center mb-10">
                    <TouchableOpacity className="w-24 h-24 bg-gray-100 rounded-full items-center justify-center border border-gray-200 mb-2">
                        <Camera size={32} color="#9CA3AF" />
                    </TouchableOpacity>
                    <Text className="text-turf font-bold text-sm">Upload Photo</Text>
                </View>

                <Input
                    label="Full Name"
                    placeholder="e.g. Rahul Tiwari"
                    value={name}
                    onChangeText={setName}
                />

                <Input
                    label="City"
                    placeholder="e.g. Bangalore"
                    value={city}
                    onChangeText={setCity}
                />
            </View>

            <Button
                title="Complete Setup"
                onPress={handleSubmit}
                disabled={!name || !city}
            />
        </SafeAreaView>
    );
}
