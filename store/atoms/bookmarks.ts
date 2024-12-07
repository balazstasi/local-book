import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import JotaiAsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorage } from "jotai/vanilla/utils/atomWithStorage";

export interface Bookmark {
  id: string;
  name: string;
  description: string;
  url: string;
  imageUri?: string;
  tags: string[];
  createdAt: string;
}

const storage = createJSONStorage(() => JotaiAsyncStorage) as AsyncStorage<Bookmark[]>;

export const bookmarksAtom = atomWithStorage<Bookmark[]>("bookmarks", [], storage);

export const addBookmarkAtom = atom(
  null,
  async (get, set, newBookmark: Omit<Bookmark, "id" | "createdAt">) => {
    const bookmarks = await get(bookmarksAtom);
    const bookmark: Bookmark = {
      ...newBookmark,
      id: Math.random().toString(36).slice(2),
      createdAt: new Date().toISOString(),
    };
    set(bookmarksAtom, [...bookmarks, bookmark]);
    return bookmark;
  }
);

export const deleteBookmarkAtom = atom(null, async (get, set, id: string) => {
  const bookmarks = await get(bookmarksAtom);
  set(
    bookmarksAtom,
    bookmarks.filter((bookmark) => bookmark.id !== id)
  );
});

export const updateBookmarkAtom = atom(null, async (get, set, bookmark: Bookmark) => {
  const bookmarks = await get(bookmarksAtom);
  set(
    bookmarksAtom,
    bookmarks.map((b) => (b.id === bookmark.id ? bookmark : b))
  );
});
