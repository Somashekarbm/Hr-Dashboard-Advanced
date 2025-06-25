import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useBookmarkStore = create(
  persist(
    (set, get) => ({
      bookmarks: [],
      
      addBookmark: (employee) => {
        const { bookmarks } = get()
        if (!bookmarks.find(b => b.id === employee.id)) {
          set({ bookmarks: [...bookmarks, employee] })
        }
      },
      
      removeBookmark: (employeeId) => {
        const { bookmarks } = get()
        set({ bookmarks: bookmarks.filter(b => b.id !== employeeId) })
      },
      
      isBookmarked: (employeeId) => {
        const { bookmarks } = get()
        return bookmarks.some(b => b.id === employeeId)
      },
      
      clearBookmarks: () => {
        set({ bookmarks: [] })
      }
    }),
    {
      name: 'hr-bookmarks',
    }
  )
) 