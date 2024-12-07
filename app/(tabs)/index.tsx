import { H2, YStack } from "tamagui";
import { ToastControl } from "app/CurrentToast";
import { FileSelector } from "components/file-selector/file-selector";

export default function MainTabScreen() {
  return (
    <YStack f={1} ai="center" gap="$8" px="$10" pt="$5" bg="$background">
      <H2>Tamagui + Expo</H2>

      <ToastControl />
      <YStack maxWidth={400} flexWrap="wrap">
        <FileSelector />
      </YStack>
    </YStack>
  );
}
