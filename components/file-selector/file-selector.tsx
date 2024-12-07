import { useState } from "react";
import { XStack, YStack, Stack, Text, styled, ScrollView, Theme } from "tamagui";
import { Folder } from "@tamagui/lucide-icons";

interface FileItem {
  id: string;
  name: string;
  isSelected: boolean;
}

const GridItem = styled(Stack, {
  width: 100,
  height: 100,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  margin: 8,
  pressStyle: {
    opacity: 0.7,
  },
  variants: {
    selected: {
      true: {
        backgroundColor: "$blue4",
      },
    },
  },
});

const GridContainer = styled(XStack, {
  flexWrap: "wrap",
  padding: 16,
});

export function FileSelector() {
  const [files, setFiles] = useState<FileItem[]>([
    { id: "1", name: "Documents", isSelected: false },
    { id: "2", name: "Pictures", isSelected: false },
    { id: "3", name: "Downloads", isSelected: false },
    { id: "4", name: "Music", isSelected: false },
    { id: "5", name: "Videos", isSelected: false },
    { id: "6", name: "Projects", isSelected: false },
    { id: "7", name: "Projects", isSelected: false },
    { id: "8", name: "Projects", isSelected: false },
    { id: "9", name: "Projects", isSelected: false },
    { id: "10", name: "Projects", isSelected: false },
    { id: "11", name: "Projects", isSelected: false },
  ]);

  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);

  function handleItemPress(id: string) {
    setFiles((prevFiles) => {
      if (isMultiSelectMode) {
        return prevFiles.map((file) => (file.id === id ? { ...file, isSelected: !file.isSelected } : file));
      } else {
        return prevFiles.map((file) => ({
          ...file,
          isSelected: file.id === id,
        }));
      }
    });
  }

  function handleLongPress() {
    setIsMultiSelectMode(true);
  }

  return (
    <Theme name="light">
      <YStack flex={1}>
        <ScrollView>
          <GridContainer>
            {files.map((file) => (
              <GridItem
                key={file.id}
                selected={file.isSelected}
                onPress={() => handleItemPress(file.id)}
                onLongPress={handleLongPress}
                pressStyle={{
                  scale: 0.97,
                }}
                animation="quick"
              >
                <Folder size={40} color={file.isSelected ? "$color.blue10" : "$color.gray11"} />
                <Text
                  numberOfLines={2}
                  textAlign="center"
                  fontSize={12}
                  marginTop={8}
                  color={file.isSelected ? "$color.blue10" : "$color.gray11"}
                >
                  {file.name}
                </Text>
              </GridItem>
            ))}
          </GridContainer>
        </ScrollView>
      </YStack>
    </Theme>
  );
}
