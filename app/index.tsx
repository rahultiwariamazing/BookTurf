/**
 * Authentication entry screen.
 * Handles mocked phone-to-OTP login and routes new users to profile setup.
 */
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowRight, Phone } from "lucide-react-native";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function LoginScreen() {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState<"phone" | "otp">("phone");
    const [loading, setLoading] = useState(false);

    // Simulates OTP dispatch and advances to verification state.
    const handleSendOtp = () => {
        if (phone.length < 10) return;
        setLoading(true);
        // Mock API call
        setTimeout(() => {
            setLoading(false);
            setStep("otp");
        }, 1500);
    };

    // Simulates OTP validation and sends user into onboarding.
    const handleVerifyOtp = () => {
        if (otp.length < 4) return;
        setLoading(true);
        // Mock API call
        setTimeout(() => {
            setLoading(false);
            router.replace("/auth/setup");
        }, 1500);
    };

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView contentContainerClassName="px-6 justify-center flex-grow">
                    <View className="items-center mb-10">
                        {/* Logo Placeholder */}
                        <View className="w-24 h-24 bg-turf rounded-full items-center justify-center mb-4">
                            <Text className="text-white text-3xl font-bold">T4A</Text>
                        </View>
                        <Text className="text-3xl font-extrabold text-turf-dark">Turf4All</Text>
                        <Text className="text-gray-500 mt-2 text-center">
                            India&apos;s Premier Cricket Turf Booking & Scoring App
                        </Text>
                    </View>

                    <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        {step === "phone" ? (
                            <>
                                <Text className="text-xl font-bold text-gray-900 mb-6">Login to Continue</Text>
                                <Input
                                    label="Phone Number"
                                    placeholder="Before calling, check +91"
                                    keyboardType="phone-pad"
                                    maxLength={10}
                                    value={phone}
                                    onChangeText={setPhone}
                                    icon={<Phone size={20} color="#6B7280" />}
                                />
                                <Button
                                    title="Get OTP"
                                    onPress={handleSendOtp}
                                    loading={loading}
                                    className="mt-2"
                                    disabled={phone.length < 10}
                                    icon={<ArrowRight size={20} color="white" />}
                                />
                            </>
                        ) : (
                            <>
                                <Text className="text-xl font-bold text-gray-900 mb-2">Verify OTP</Text>
                                <Text className="text-gray-500 mb-6">Entered OTP sent to +91 {phone}</Text>
                                <Input
                                    label="Enter OTP"
                                    placeholder="X X X X"
                                    keyboardType="number-pad"
                                    maxLength={4}
                                    value={otp}
                                    onChangeText={setOtp}
                                    className="text-center text-2xl tracking-widest font-bold"
                                />
                                <Button
                                    title="Verify & Login"
                                    onPress={handleVerifyOtp}
                                    loading={loading}
                                    className="mt-2"
                                    disabled={otp.length < 4}
                                />
                                <Button
                                    title="Change Number"
                                    variant="secondary"
                                    onPress={() => setStep("phone")}
                                    className="mt-4"
                                />
                            </>
                        )}
                    </View>

                    <Text className="text-center text-gray-400 text-xs mt-10">
                        By logging in, you agree to our Terms & Privacy Policy
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
