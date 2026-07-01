/**
 * Rules and policy reference screen.
 * Contains safety, conduct, and cancellation guidelines visible to users.
 */
import { StatusBar } from "expo-status-bar";
import { Gavel, Info, ShieldAlert } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RulesScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style="dark" />
            <View className="px-6 py-4 border-b border-gray-100">
                <Text className="text-2xl font-extrabold text-gray-900">Rules & Policies</Text>
            </View>

            <ScrollView className="flex-1 p-6">
                <Section
                    icon={<ShieldAlert color="#DC2626" size={24} />}
                    title="Safety & Liability"
                    content={`• By booking using Turf4All, you accept full responsibility for any injuries, accidents, or personal losses.\n• The venue and the app are not liable for any physical harm during play.\n• First-aid kits are usually available at venue reception.`}
                />

                <Section
                    icon={<Gavel color="#006400" size={24} />}
                    title="Code of Conduct"
                    content={`• Maintain fair play at all times.\n• No abuse or harassment towards venue staff or other players.\n• Venue staff decisions are final regarding ground rules.\n• Alcohol, smoking, and drugs are strictly prohibited.`}
                />

                <Section
                    icon={<Info color="#2563EB" size={24} />}
                    title="Cancellation & Refunds"
                    content={`• Cancellations are allowed only within the window specified by the venue (usually 8 hours prior).\n• Refund percentage depends on venue policy (usually 80-90%).\n• No refunds for no-shows.`}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

function Section({ icon, title, content }: { icon: any, title: string, content: string }) {
    // Uniform presenter for policy sections to keep spacing and typography consistent.
    return (
        <View className="mb-8">
            <View className="flex-row items-center mb-3">
                {icon}
                <Text className="text-lg font-bold text-gray-900 ml-2">{title}</Text>
            </View>
            <Text className="text-gray-600 leading-6">{content}</Text>
        </View>
    )
}
