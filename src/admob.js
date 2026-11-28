import { Capacitor } from '@capacitor/core';
import {
  AdMob,
  AdmobConsentStatus,
  PrivacyOptionsRequirementStatus,
  BannerAdSize,
  BannerAdPosition
} from '@capacitor-community/admob';

const ANDROID_BANNER_TEST_ID = 'ca-app-pub-3940256099942544/9214589741';
const IOS_BANNER_TEST_ID = 'ca-app-pub-3940256099942544/2435281174';

let initialized = false;
let bannerVisible = false;
let bannerHidden = false;
let privacyOptionsRequired = false;
let startupPromise = null;

async function start() {
  if (!Capacitor.isNativePlatform()) return { available: false };
  if (startupPromise) return startupPromise;

  startupPromise = (async () => {
    try {
      let consent = await AdMob.requestConsentInfo();
      if (consent.isConsentFormAvailable && consent.status === AdmobConsentStatus.REQUIRED) {
        consent = await AdMob.showConsentForm();
      }

      privacyOptionsRequired =
        consent.privacyOptionsRequirementStatus === PrivacyOptionsRequirementStatus.REQUIRED;
      window.dispatchEvent(new CustomEvent('finemese:privacy-options', {
        detail: { required: privacyOptionsRequired }
      }));

      if (!consent.canRequestAds) return { available: false, reason: 'consent-required' };

      if (!initialized) {
        await AdMob.initialize();
        initialized = true;
      }
      return { available: true };
    } catch (error) {
      startupPromise = null;
      console.warn('FineMese AdMob consent/initialization unavailable:', error);
      return { available: false, reason: 'initialization-failed' };
    }
  })();

  return startupPromise;
}

async function showBanner() {
  if (!Capacitor.isNativePlatform()) return;
  if (bannerVisible) {
    if (bannerHidden) {
      try {
        await AdMob.resumeBanner();
        bannerHidden = false;
        document.documentElement.classList.add('finemese-has-banner');
      } catch (error) {
        console.warn('FineMese banner resume failed:', error);
      }
    }
    return;
  }

  const ready = await start();
  if (!ready.available) return;

  try {
    await AdMob.showBanner({
      adId: Capacitor.getPlatform() === 'ios' ? IOS_BANNER_TEST_ID : ANDROID_BANNER_TEST_ID,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true
    });
    bannerVisible = true;
    bannerHidden = false;
    document.documentElement.classList.add('finemese-has-banner');
  } catch (error) {
    console.warn('FineMese test banner unavailable:', error);
  }
}

async function hideBanner() {
  if (!Capacitor.isNativePlatform() || !bannerVisible || bannerHidden) return;
  try {
    await AdMob.hideBanner();
    bannerHidden = true;
    document.documentElement.classList.remove('finemese-has-banner');
  } catch (error) {
    console.warn('FineMese banner hide failed:', error);
  }
}

async function removeBanner() {
  if (!Capacitor.isNativePlatform() || !bannerVisible) return;
  try {
    await AdMob.removeBanner();
  } catch (error) {
    console.warn('FineMese banner removal failed:', error);
  } finally {
    bannerVisible = false;
    bannerHidden = false;
    document.documentElement.classList.remove('finemese-has-banner');
  }
}

async function showPrivacyOptions() {
  if (!Capacitor.isNativePlatform() || !privacyOptionsRequired) return;
  try {
    await AdMob.showPrivacyOptionsForm();
  } catch (error) {
    console.warn('FineMese privacy options form unavailable:', error);
  }
}

window.FineMeseAds = {
  start,
  showBanner,
  hideBanner,
  removeBanner,
  showPrivacyOptions,
  isNative: () => Capacitor.isNativePlatform()
};
