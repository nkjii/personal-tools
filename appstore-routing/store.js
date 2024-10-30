// OSの判定
function getOS() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(userAgent)) {
    return "Android";
  }
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }
  return "unknown";
}

// アプリがインストール済みかを判定
function checkAppInstallation() {
  const os = getOS();
  if (os === "iOS") {
    // iOSの場合、カスタムURLスキームを使用してアプリが開けるか確認
    window.location.href = "yourappscheme://";
    setTimeout(() => {
      showDialog();
    }, 1500); // 適切な遅延時間を設定
  } else if (os === "Android") {
    // Androidの場合、intent URLを使用
    window.location.href =
      "intent://yourappscheme/#Intent;package=com.yourapp.package;end";
    setTimeout(() => {
      showDialog();
    }, 1500);
  } else {
    alert("対応していないOSです。");
  }
}

// ダイアログを表示してアプリストアに遷移
function showDialog() {
  const os = getOS();
  if (
    confirm(
      "アプリがインストールされていません。App StoreやGoogle Playに移動しますか？"
    )
  ) {
    if (os === "iOS") {
      window.location.href = "https://apps.apple.com/jp/app/yourapp";
    } else if (os === "Android") {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.yourapp.package";
    }
  }
}

// 処理を開始
checkAppInstallation();
