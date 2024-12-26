interface TelegramWebApp {
  ready: () => void;
  close: () => void;
  expand: () => void;
  MainButton: any;
  BackButton: any;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
      photo_url?: string;
    };
  };
  colorScheme: 'light' | 'dark';
  backgroundColor: string;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  version: string;
  platform: string;
  setHeaderColor: (color: string) => void;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  onEvent: (eventType: string, callback: (...args: any[]) => void) => void;
  offEvent: (eventType: string, callback: (...args: any[]) => void) => void;
  sendData: (data: any) => void;
  showPopup: (params: any) => void;
  showAlert: (message: string, callback?: () => void) => void;
  showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void;
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
  setViewportSettings: (settings: { height?: number; stable_height?: number; is_expanded?: boolean }) => void;
}

interface Window {
  Telegram?: {
    WebApp: TelegramWebApp;
  };
}

