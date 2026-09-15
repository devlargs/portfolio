import { Learning } from '../types';

const learning: Learning = {
  slug: 'expo-firebase-push-notifications',
  title: 'Push notifications in Expo with Firebase: a step by step setup',
  summary:
    "Expo's push service still delivers through FCM and APNs, so you need Firebase either way. The FCM V1 service account key is the step that trips everyone up, and none of it works in Expo Go.",
  published: '2026-09-15',
  tags: ['expo', 'react-native', 'firebase', 'notifications'],
  body: [
    {
      kind: 'text',
      content: 'Two things worth settling before you start, because they change the whole setup.',
    },
    {
      kind: 'text',
      content:
        '**You still need Firebase even if you use Expo\'s push service.** Expo\'s push service is a wrapper that ultimately delivers through FCM on Android and APNs on iOS. So "Expo push" and "Firebase" are not alternatives. You need the Firebase project either way. The real choice is whether your server talks to Expo\'s endpoint or to FCM directly, and unless you need custom notification sounds or fine control over the payload, use Expo\'s.',
    },
    {
      kind: 'note',
      tone: 'warn',
      content:
        '**This will not work in Expo Go.** On SDK 53 and later, push notifications are unavailable in Expo Go, so you need a development build. Half the "my token won\'t generate" posts online are this.',
    },
    {
      kind: 'text',
      content:
        'You also need a physical device, or an Android emulator with Google Play services. Remote push does not work on a bare simulator.',
    },
    {
      kind: 'heading',
      content: '1. Install the libraries',
    },
    {
      kind: 'code',
      label: 'terminal',
      content: 'npx expo install expo-notifications expo-device expo-constants',
    },
    {
      kind: 'text',
      content: 'Add the config plugin in `app.json`:',
    },
    {
      kind: 'code',
      label: 'app.json',
      content: `{
  "expo": {
    "plugins": ["expo-notifications"]
  }
}`,
    },
    {
      kind: 'heading',
      content: '2. Create the Firebase project and add google-services.json',
    },
    {
      kind: 'text',
      content:
        'Create a project in the [Firebase Console](https://console.firebase.google.com), add an Android app with your exact package name (it has to match `expo.android.package`), and download `google-services.json`.',
    },
    {
      kind: 'text',
      content: 'Put it at the project root, gitignore it, and point `app.json` at it:',
    },
    {
      kind: 'code',
      label: 'app.json',
      content: `{
  "expo": {
    "android": {
      "package": "com.yourcompany.yourapp",
      "googleServicesFile": "./google-services.json"
    }
  }
}`,
    },
    {
      kind: 'heading',
      content: '3. Generate the FCM V1 service account key',
    },
    {
      kind: 'text',
      content:
        'This is the step that trips people up, because the old FCM legacy server key is gone. V1 authenticates with OAuth using a service account instead.',
    },
    {
      kind: 'text',
      content:
        'In the Firebase console go to **Project settings > Service accounts**. Click **Generate New Private Key**, confirm, and store the JSON file somewhere safe. It is a credential, so keep it out of version control.',
    },
    {
      kind: 'heading',
      content: '4. Upload the key to EAS',
    },
    {
      kind: 'code',
      label: 'terminal',
      content: 'eas credentials',
    },
    {
      kind: 'text',
      content:
        'Choose `Android` > `production` > `Google Service Account` > `Manage your Google Service Account Key for Push Notifications (FCM V1)`, then upload the JSON. You can also do this from the EAS dashboard under Credentials.',
    },
    {
      kind: 'note',
      tone: 'warn',
      content:
        'There are two separate slots in that menu. One is for Play Store submissions, one is for FCM V1 push. Uploading to the wrong one silently does nothing.',
    },
    {
      kind: 'heading',
      content: '5. Set up iOS credentials',
    },
    {
      kind: 'text',
      content: 'This needs a paid Apple Developer account.',
    },
    {
      kind: 'text',
      content: 'Register your test device first. Then, when you run `eas build` for the first time, answer yes to:',
    },
    {
      kind: 'list',
      items: ['Setup Push Notifications for your project', 'Generating a new Apple Push Notifications service key'],
    },
    {
      kind: 'text',
      content: 'If you already built without doing that, run `eas credentials` and set it up manually.',
    },
    {
      kind: 'heading',
      content: '6. Write the client code',
    },
    {
      kind: 'code',
      label: 'notifications.ts',
      content: `import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) return null;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  let final = existing;
  if (existing !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    final = status;
  }
  if (final !== 'granted') return null;

  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
  if (!projectId) throw new Error('Missing EAS projectId');

  return (await Notifications.getExpoPushTokenAsync({ projectId })).data;
}`,
    },
    {
      kind: 'text',
      content: 'Two details in there matter more than they look.',
    },
    {
      kind: 'text',
      content:
        'The Android notification channel has to exist *before* a notification arrives, or Android 8+ drops it silently.',
    },
    {
      kind: 'text',
      content:
        'And passing `projectId` explicitly is recommended, because it keeps the token valid if the project is transferred between accounts or the account gets renamed.',
    },
    {
      kind: 'text',
      content: 'Attach the listeners in a `useEffect` and remove them on unmount:',
    },
    {
      kind: 'code',
      label: 'listeners.tsx',
      content: `useEffect(() => {
  const received = Notifications.addNotificationReceivedListener(n => console.log(n));
  const responded = Notifications.addNotificationResponseReceivedListener(r => console.log(r));
  return () => {
    received.remove();
    responded.remove();
  };
}, []);`,
    },
    {
      kind: 'heading',
      content: '7. Build and test',
    },
    {
      kind: 'code',
      label: 'terminal',
      content: 'eas build --profile development --platform android',
    },
    {
      kind: 'text',
      content:
        'Install the build, run `npx expo start`, and grab the printed token. It looks like `ExponentPushToken[xxxxxxxx]`.',
    },
    {
      kind: 'text',
      content:
        'Paste it into the [Expo push notifications tool](https://expo.dev/notifications) with a title and body, and send.',
    },
    {
      kind: 'heading',
      content: '8. Send from your server',
    },
    {
      kind: 'code',
      label: 'send.ts',
      content: `await fetch('https://exp.host/--/api/v2/push/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: expoPushToken,
    title: 'Hello',
    body: 'Body text',
    sound: 'default',
    channelId: 'default',
    data: { screen: '/orders/42' },
  }),
});`,
    },
    {
      kind: 'text',
      content:
        'Batch these in arrays of up to 100 tokens, and read the receipts afterwards. A 200 response means Expo accepted the message, not that it was delivered.',
    },
    {
      kind: 'heading',
      content: "The failures you'll actually hit",
    },
    {
      kind: 'list',
      items: [
        '`MismatchSenderId`. Your service account key and your `google-services.json` come from different Firebase projects. Check that `project_number` in `google-services.json` matches the Firebase project the uploaded key came from.',
        "**Token generates but nothing arrives on Android.** Usually the `channelId` in the push payload doesn't match a channel you created. The other common cause is rebuilding without the new `google-services.json`, since that file gets compiled into the binary at build time, not read at runtime.",
        '**Works in dev, dies in TestFlight.** iOS has separate sandbox and production APNs environments. `eas build --profile production` handles this correctly, but a manually configured credential can end up pointing at the wrong one.',
        '`InvalidCredentials`. The push credentials were revoked or never uploaded. Recheck the FCM V1 service account key slot in the EAS dashboard.',
      ],
    },
    {
      kind: 'heading',
      content: 'If you need FCM directly',
    },
    {
      kind: 'text',
      content:
        "Use `@react-native-firebase/messaging` and drop the Expo push service entirely. It's more setup and you lose the unified cross platform token, so only go there if custom notification sounds or data only messages are a hard requirement. The `expo-notifications` API itself is push service agnostic, so the client side handling code mostly carries over.",
    },
  ],
};

export default learning;
