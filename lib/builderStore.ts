import { create } from 'zustand';
import { SectionNode, BuilderState, Breakpoint, ColumnNode, WidgetNode } from './types';
import { v4 as uuidv4 } from 'uuid';

interface BuilderStore extends Omit<BuilderState, 'history'> {
  history: {
    past: SectionNode[][];
    future: SectionNode[][];
  };
  setPageId: (id: string) => void;
  setCanvas: (canvas: SectionNode[]) => void;
  addSection: (section: SectionNode, index?: number) => void;
  removeSection: (id: string) => void;
  updateSection: (id: string, updates: Partial<SectionNode>) => void;
  addColumn: (sectionId: string, column: ColumnNode) => void;
  removeColumn: (sectionId: string, columnId: string) => void;
  updateColumn: (sectionId: string, columnId: string, updates: Partial<ColumnNode>) => void;
  addWidget: (sectionId: string, columnId: string, widget: WidgetNode, index?: number) => void;
  removeWidget: (id: string) => void;
  updateWidget: (id: string, updates: Partial<WidgetNode>) => void;
  moveWidget: (from: { sectionId: string; columnId: string; index: number }, to: { sectionId: string; columnId: string; index: number }) => void;
  selectElement: (id: string | null) => void;
  setResponsiveMode: (mode: Breakpoint) => void;
  setPreviewMode: (isPreview: boolean) => void;
  undo: () => void;
  redo: () => void;
  setGlobalSettings: (settings: Partial<BuilderStore['globalSettings']>) => void;
  saveToHistory: () => void;
}

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  pageId: '',
  canvas: [],
  selectedElementId: null,
  responsiveMode: 'desktop',
  isPreviewMode: false,
  globalSettings: {
    primaryColor: '#3b82f6',
    secondaryColor: '#1e293b',
    fontFamily: 'Inter',
    containerWidth: '1200px',
  },
  history: {
    past: [],
    future: [],
  },

  saveToHistory: () => {
    const { canvas, history } = get();
    // Only save if canvas has changed from the last past state
    if (history.past.length > 0 && JSON.stringify(history.past[history.past.length - 1]) === JSON.stringify(canvas)) {
      return;
    }
    set({
      history: {
        past: [...history.past, JSON.parse(JSON.stringify(canvas))].slice(-30),
        future: [],
      },
    });
  },

  setPageId: (id) => set({ pageId: id }),

  setCanvas: (canvas) => {
    get().saveToHistory();
    set({ canvas });
  },

  addSection: (section, index) => {
    get().saveToHistory();
    const { canvas } = get();
    const newCanvas = [...canvas];
    if (index !== undefined) {
      newCanvas.splice(index, 0, section);
    } else {
      newCanvas.push(section);
    }
    set({ canvas: newCanvas });
  },

  removeSection: (id) => {
    get().saveToHistory();
    const { canvas } = get();
    set({ canvas: canvas.filter((s) => s.id !== id) });
    if (get().selectedElementId === id) set({ selectedElementId: null });
  },

  updateSection: (id, updates) => {
    get().saveToHistory();
    const { canvas } = get();
    set({
      canvas: canvas.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    });
  },

  addColumn: (sectionId, column) => {
    get().saveToHistory();
    const { canvas } = get();
    set({
      canvas: canvas.map((s) =>
        s.id === sectionId ? { ...s, columns: [...s.columns, column] } : s
      ),
    });
  },

  removeColumn: (sectionId, columnId) => {
    get().saveToHistory();
    const { canvas } = get();
    set({
      canvas: canvas.map((s) =>
        s.id === sectionId ? { ...s, columns: s.columns.filter((c) => c.id !== columnId) } : s
      ),
    });
    if (get().selectedElementId === columnId) set({ selectedElementId: null });
  },

  updateColumn: (sectionId, columnId, updates) => {
    get().saveToHistory();
    const { canvas } = get();
    set({
      canvas: canvas.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              columns: s.columns.map((c) => (c.id === columnId ? { ...c, ...updates } : c)),
            }
          : s
      ),
    });
  },

  addWidget: (sectionId, columnId, widget, index) => {
    get().saveToHistory();
    const { canvas } = get();
    set({
      canvas: canvas.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              columns: s.columns.map((c) => {
                if (c.id === columnId) {
                  const newWidgets = [...c.widgets];
                  if (index !== undefined) {
                    newWidgets.splice(index, 0, widget);
                  } else {
                    newWidgets.push(widget);
                  }
                  return { ...c, widgets: newWidgets };
                }
                return c;
              }),
            }
          : s
      ),
    });
  },

  removeWidget: (id) => {
    get().saveToHistory();
    const { canvas } = get();
    set({
      canvas: canvas.map((s) => ({
        ...s,
        columns: s.columns.map((c) => ({
          ...c,
          widgets: c.widgets.filter((w) => w.id !== id),
        })),
      })),
    });
    if (get().selectedElementId === id) set({ selectedElementId: null });
  },

  updateWidget: (id, updates) => {
    get().saveToHistory();
    const { canvas } = get();
    set({
      canvas: canvas.map((s) => ({
        ...s,
        columns: s.columns.map((c) => ({
          ...c,
          widgets: c.widgets.map((w) => (w.id === id ? { ...w, ...updates } : w)),
        })),
      })),
    });
  },

  moveWidget: (from, to) => {
    get().saveToHistory();
    const { canvas } = get();
    const newCanvas = JSON.parse(JSON.stringify(canvas));
    
    // Find the source section and column
    const sourceSection = newCanvas.find((s: any) => s.id === from.sectionId);
    const sourceColumn = sourceSection?.columns.find((c: any) => c.id === from.columnId);
    if (!sourceColumn) return;

    // Remove the widget from the source
    const [movedWidget] = sourceColumn.widgets.splice(from.index, 1);
    if (!movedWidget) return;

    // Find the target section and column
    const targetSection = newCanvas.find((s: any) => s.id === to.sectionId);
    const targetColumn = targetSection?.columns.find((c: any) => c.id === to.columnId);
    if (!targetColumn) return;

    // Add the widget to the target
    targetColumn.widgets.splice(to.index, 0, movedWidget);

    set({ canvas: newCanvas });
  },

  selectElement: (id) => set({ selectedElementId: id }),
  setResponsiveMode: (mode) => set({ responsiveMode: mode }),
  setPreviewMode: (isPreview) => set({ isPreviewMode: isPreview }),

  undo: () => {
    const { canvas, history } = get();
    if (history.past.length === 0) return;

    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, history.past.length - 1);

    set({
      canvas: previous,
      history: {
        past: newPast,
        future: [JSON.parse(JSON.stringify(canvas)), ...history.future],
      },
    });
  },

  redo: () => {
    const { canvas, history } = get();
    if (history.future.length === 0) return;

    const next = history.future[0];
    const newFuture = history.future.slice(1);

    set({
      canvas: next,
      history: {
        past: [...history.past, JSON.parse(JSON.stringify(canvas))],
        future: newFuture,
      },
    });
  },

  setGlobalSettings: (settings) =>
    set((state) => ({
      globalSettings: { ...state.globalSettings, ...settings },
    })),
}));
