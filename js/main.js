var logElement;
const loggingQueue = [];

window.onload = function () {
    logElement = document.getElementById('data');
}

// 상용서버 init
// transport: 'BEACON' | 'XHR' | 'IMAGE' // 셋중 하나 사용
window.adbrix.init({
    // appkey: '%DFN_APP_KEY%',
    // webSecretkey: '%DFN_SECRET_KEY%',
    appkey: 'cAVuvs0NME6CYykRMb0Ecw',
    webSecretkey: 'kKtoq4zZME2bcA9Lnreryg',
    isOptOut: true, //json의 optout 상태 확인
    isExecPageViewEvent: true, // pageview 이벤트 호출 확인
    shareSubdomainCookie: true, // 쿠키값 저장
    isIncludeReferrer: true, // 추가 리퍼러값 확인
    isIncludeUtm: true, // utm 광고를 추적합니다.
    isIncludeGclid: true, // gclid를 추적합니다.
    isIncludeNaver: true, // naver 광고를 추적합니다.
    isIncludeFbclid: true, // 페이스북에서 진입시 fbclid 파람 확인
    transport: 'BEACON',
    // transport: 'XHR',
    // transport: 'IMAGE',

    // push: {
    //     enable: true,
    //     serviceWorkerOptions: {
    //         file_name: "service-worker.js",
    //         file_path: "/",
    //         scope: "/"
    //     },
    // },

    // In Web Message 추가 설정
    inWebMessage: {
        enable: true,
        openInNewWindow: true,
        zIndex: 99999,
        fetchListener: function (message) {
            console.log('fetch_listener ' + message);
        },
        clickListener: function (actionId, actionType, actionArg, isClosed) {
            console.log('click_listener ' + actionId + actionType + actionArg + isClosed);
        },
    },
    traceLevel: 3,
    traceListener: function (message) {
        console.log(message);
        loggingQueue.push(message);
        if (logElement) {
            while (loggingQueue.length != 0) {
                sendDataToLogging(loggingQueue.pop());
            }
        }
    },
});

function sendDataToLogging(message) {
    var tagNode = document.createElement('tr');
    tagNode.style.marginBlockStart = '20px';
    tagNode.style.color = 'white';

    tagNode.innerText = new Date().toLocaleString() + "[logging] : " + message + "\n";
    var whiteSpacing = document.createElement('br');
    logElement.appendChild(tagNode);
    tagNode.appendChild(whiteSpacing);
    var nestedElement = document.getElementById('data');
    nestedElement.scrollTo(0, nestedElement.scrollHeight);
}

// dev 도교서버 init
// transport: 'BEACON' | 'XHR' | 'IMAGE' // 셋중 하나 사용
// window.adbrix.init({
//     appkey: 'FLpZEMEmKE2DxEfTrcyyaw',
//     webSecretkey: 'ahtLbSDj0UqMuTpi9dsyug',
//     // appkey: 'cAVuvs0NME6CYykRMb0Ecw',
//     // webSecretkey: 'kKtoq4zZME2bcA9Lnreryg',
//     isOptOut: true, //json의 optout 상태 확인
//     isExecPageViewEvent: true, // pageview 이벤트 호출 확인
//     shareSubdomainCookie: true, // 쿠키값 저장
//     isIncludeReferrer: true, // 추가 리퍼러값 확인
//     isIncludeUtm: true, // utm 광고를 추적합니다.
//     isIncludeGclid: true, // gclid를 추적합니다.
//     isIncludeNaver: true, // naver 광고를 추적합니다.
//     isIncludeFbclid: true, // 페이스북에서 진입시 fbclid 파람 확인
//     transport: 'BEACON',

//     push: {
//         enable: true,
//         serviceWorkerOptions: {
//             file_name: "service-worker.js",
//             file_path: "/",
//             scope: "/"
//         },
//     },
//     inWebMessage: {
//         enable: true,
//         open_in_new_window: true,
//         fetch_listener: function (message) {
//             console.log('fetch_listener ' + message);
//         },
//         click_listener: function (actionId, actionType, actionArg, isClosed) {
//             console.log('click_listener ' + actionId + actionType + actionArg + isClosed);
//         },
//         zIndex: 99999,
//     },
//     traceLevel: 3,
//     traceListener: function (message) {
//         console.log(message);
//         loggingQueue.push(message);
//         if (logElement) {
//             while (loggingQueue.length != 0) {
//                 sendDataToLogging(loggingQueue.pop());
//             }
//         }
//     },
// });

window.adbrix.push.showPrompt();

$(document).ready(function () {
    adbrix.commerce.viewHome();
    console.log("ready:::::::");
    if (isAndroidBridgeAvailable()) {
        console.log("android device!!!");
        $("#main-container-title").text("Android!!!");
        $("#main-side-logo").css("font-size", "15px");
        $("#1").text("유저");
        $("#2").text("커스텀");
        $("#3").text("공통");
        $("#4").text("결제");
        $("#5").text("커머스");
        $("#6").text("게임");
    } else if (isIosBridgeAvailable()) {
        console.log("ios device!!!");
        $("#main-container-title").text("ios!!!");
        $("#main-side-logo").css("font-size", "15px");
        $("#1").text("유저");
        $("#2").text("커스텀");
        $("#3").text("공통");
        $("#4").text("결제");
        $("#5").text("커머스");
        $("#6").text("게임");
    } else {
        console.log("only support mobile devices!!!");
        $("#main-container-title").text("only support mobile devices!!!!!!");
        $("#main-side-logo").css("font-size", "30px");
        $("#1").text("유저 이벤트");
        $("#2").text("커스텀 이벤트");
        $("#3").text("공통(일반) 이벤트");
        $("#4").text("결제하기 이벤트");
        $("#5").text("커머스 이벤트");
        $("#6").text("게임 이벤트");
    }
    $("#main-container").css("margin-left", $("#main-side").width());
});

$(window).resize(function () {
    $("#main-container").css("margin-left", $("#main-side").width());
    $("#event-title").css("width", $("#main-container").width());
    $(".eventClass").css("width", $("#main-container").width());
});

function listButton(e) {
    var url = "https://william.ap2-qa.dfn.link/api/v1/click/j2n41Cq9KUK8WbxYVo10GQ?cb_1={cb_1}&abx_tracker_id=j2n41Cq9KUK8WbxYVo10GQ";
    $("#event-title").css("display", "inline");
    if (e.id === "main-side-logo") {
        $(".container-view").css("display", "none");
        $("#event-title").css("display", "none");
        $("#main-container-title").html("Web_SDK");
        viewHome();
    }
    if (e.id === "1") {
        console.log("유저분석");
        $(".container-view").css("display", "none");
        $("#container-event1").css("display", "inline");
        $("#main-container-title").html("유저분석 이벤트");
    }
    else if (e.id === "2") {
        console.log("커스텀 이벤트");
        $(".container-view").css("display", "none");
        $("#container-event2").css("display", "inline");
        $("#main-container-title").html("커스텀 이벤트");
        // window.location.href = "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/index.html";
    }
    else if (e.id === "3") {
        console.log("공통(일반) 이벤트");
        $(".container-view").css("display", "none");
        $("#container-event3").css("display", "inline");
        $("#main-container-title").html("공통(일반) 이벤트");
        // adbrix.common.signUp('ETC');
        // window.location.href = "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/event1.html";
    }
    else if (e.id === "4") {
        console.log("결제하기 이벤트");
        $(".container-view").css("display", "none");
        $("#container-event4").css("display", "inline");
        $("#main-container-title").html("결제하기 이벤트");
        // adbrix.common.signUp('Kakao');

        // window.location.href = "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/event2.html";
        // XMLHttpRequest를 사용하여 다른 HTML 파일을 가져옵니다.
        // var xhttp = new XMLHttpRequest();
        // xhttp.onreadystatechange = function () {
        //     if (this.readyState == 4 && this.status == 200) {
        //         // 가져온 HTML 파일의 내용을 dev 영역에 표시합니다.
        //         document.getElementById("main").innerHTML = this.responseText;

        //     }
        // };
        // 가져올 HTML 파일의 경로를 지정합니다.
        // xhttp.open("GET", "event2.html", true);
        // xhttp.send();
    }
    else if (e.id === "5") {
        console.log("커머스 이벤트");
        $(".container-view").css("display", "none");
        $("#container-event5").css("display", "inline");
        $("#main-container-title").html("커머스 이벤트");
    }
    else if (e.id === "6") {
        console.log("게임 이벤트");
        $(".container-view").css("display", "none");
        $("#container-event6").css("display", "inline");
        $("#main-container-title").html("게임 이벤트");
    }
    else if (e.id === "7") {
        console.log("패치 API");
        $(".container-view").css("display", "none");
        $("#container-event7").css("display", "inline");
        $("#main-container-title").html("패치 API");
    } 
    else if (e.id === "8") {
        console.log("알림 설정");
        $(".container-view").css("display", "none");
        $("#container-event8").css("display", "inline");
        $("#main-container-title").html("알림 설정");
        SubscriptionStatus();
    }
    else if (e.id === "9") {
        window.open(url, '_blank');
    }
    else if (e.id === "10") {
        location.href = url;
    }
};

function SubscriptionStatus(){
    // 푸시알림 상태 값 서버에서 가져오기
    adbrix.getSubscriptionStatus().then(result => {
        if (result.is_success) {
            const info_flag = result.informative_notification_flag;
            const mkt_flag = result.marketing_notification_flag;
            const night_flag = result.marketing_notification_at_night_flag;
            console.log(result);
        }
    });
}


function login() {
    sendDataToLogging("login Called");
    var loginid = $('#loginInput').val();
    const param = {
        method_name: AdbrixMethodName.login,  // 원하는 API명을 입력.
        user_id: loginid
    };

    if (isAndroidBridgeAvailable()) {
        sendDataToLogging("login called. Android");
        adbrixBridge.invoke(JSON.stringify(param));
    } else if (isIosBridgeAvailable()) {
        sendDataToLogging("login called. IOS");
        window.webkit.messageHandlers.adbrixBridge.postMessage(param);
    } else {
        sendDataToLogging("login called. Web");
        adbrix.login(loginid);
    }
}

function logout() {
    sendDataToLogging("logout Called");
    const param = {
        method_name: AdbrixMethodName.logout
    }

    if (isAndroidBridgeAvailable()) {
        sendDataToLogging("logout called. Android");
        adbrixBridge.invoke(JSON.stringify(param));
    } else if (isIosBridgeAvailable()) {
        sendDataToLogging("logout called. IOS");
        window.webkit.messageHandlers.adbrixBridge.postMessage(param);
    } else {
        sendDataToLogging("logout called. Web");
        adbrix.logout();
    }
}

function signUp() {
    sendDataToLogging("signUp Called");

    var loginid = $('#loginInput').val();
    var SignChannel = $("#SignChannel option:selected").val();
    var age = $('#userRegister_AgeInput').val();
    var gender = $('input[name=userRegister_Gender]:checked').val();
    var married = $('input[name=userRegister_Married]:checked').val();
    const param = {
        method_name: AdbrixMethodName.signUp,
        sign_channel: AdbrixSignUpChannel.Google,  // number
        extra_attr: {
            user_id: "user_id",
            gender: AdbrixGenderType.Male,  // number
            age: age  // number
        }
    }
    console.log("loginid:::" + loginid);
    console.log("SignChannel:::" + SignChannel);
    console.log("age:::::" + age);
    console.log("gender:::::" + gender);
    console.log("married:::::" + married);

    if (isAndroidBridgeAvailable()) {
        sendDataToLogging("signUp called. Android");
        adbrixBridge.invoke(JSON.stringify(param));
    } else if (isIosBridgeAvailable()) {
        sendDataToLogging("signUp called. IOS");
        window.webkit.messageHandlers.adbrixBridge.postMessage(param);
    } else {
        sendDataToLogging("signUp called. Web");
        adbrix.common.signUp(SignChannel, { "userRegister": "userRegister", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });
    }
}

function purchase() {
    sendDataToLogging("purchase Called");
    var orderId = $('#purchase_orderIDInput').val();
    var orderSales = Number($('#purchase_orderSalesInput').val());
    var productId = $('#purchase_productIDInput').val();
    var productName = $('#purchase_productNameInput').val();
    var price = Number($('#purchase_priceInput').val());
    var quantity = Number($('#purchase_quantityInput').val());
    var discount = Number($('#purchase_discountInput').val());
    var currencyEnum = $("#currencyEnum option:selected").val();
    var deliveryCharge = 0;
    // var delivery = $('#purchase_deliveryInput').val();
    var payment = $("#paymentEnum option:selected").val();
    var categories = { category1: "category1", category2: "category2", category3: "category3", category4: "category4" };
    console.log("orderId:::::::::" + orderId);
    console.log("orderSales:::::::::" + orderSales);
    console.log("productId:::::::::" + productId);
    console.log("productName:::::::::" + productName);
    console.log("price:::::::::" + price);
    console.log("quantity:::::::::" + quantity);
    console.log("discount:::::::::" + discount);
    console.log("currencyEnum:::::::::" + currencyEnum);
    // console.log("delivery:::::::::" + delivery);
    console.log("payment:::::::::" + payment);
    //하이브리드 연결
    console.log("isAndroidBridgeAvailable():::::::::" + isAndroidBridgeAvailable());
    var products = [];
    product = adbrix.commerceAttr.product('test_product_id', '상품명', 1000, 5, 200, currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'test', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });
    products.push(product);
    adbrix.common.purchase(
        orderId,                      // 주문번호 order_id
        products,                     // 상품리스트 product[]
        orderSales,                      // 전체 주문 금액 order sales
        discount,                      // 할인 금액 discount
        1000,                      // 배송비 delivery charge
        payment,                        // 결제 방법 payment
        null              // 결제 프로퍼티 properties
    );

    var categories = adbrix.commerceAttr.categories(
        "category1",           // 카테고리 1 (필수)
        "category2",           // 카테고리 2
        "category3",           // 카테고리 3
        "category4",           // 카테고리 4
        "category5"            // 카테고리 5
    );

    var product = adbrix.commerceAttr.product(
        productId,            // 상품번호 product_id
        productName,          // 상품이름 product_name
        price,                 // 상품단가 price
        quantity,              // 구매수량 quantity
        discount,              // 할인금액 discount
        currencyEnum,          // 구매화폐 정보 currencyEnum
        categories           // 카테고리 정보 category
    );

    // 상품정보 리스트
    // var products = [];
    products.push(product);
    products.push(product);

    const hybridProducts = [];
    hybridProducts.push({
        product_id: productId,
        product_name: productName,
        price: price,
        quantity: quantity,
        discount: discount,
        currency: AdbrixCurrency.CNY,
        categories: categories
    });
    hybridProducts.push({
        product_id: productId,
        product_name: productName,
        price: price,
        quantity: quantity,
        discount: discount,
        currency: AdbrixCurrency.CNY,
        categories: categories
    });

    const param = {
        method_name: AdbrixMethodName.purchase,
        order_id: "orderID",
        order_sales: orderSales,
        discount: discount,
        delivery_charge: deliveryCharge,
        payment_method: AdbrixPaymentMethod.BankTransfer,
        quantity: 1,
        items: hybridProducts,
        extra_attr: {
            attrKey: "attrValue"
        }
    }

    console.log(`param : ${JSON.stringify(param)}`);
    if (isAndroidBridgeAvailable()) {
        sendDataToLogging("purchase called. Android");
        adbrixBridge.invoke(JSON.stringify(param));
    } else if (isIosBridgeAvailable()) {
        sendDataToLogging("purchase called. IOS");
        window.webkit.messageHandlers.adbrixBridge.postMessage(param);
    } else {
        sendDataToLogging("purchase called. Web");
        adbrix.common.purchase(
            orderId,                      // 주문번호 order_id
            products,                     // 상품리스트 product[]
            orderSales,                      // 전체 주문 금액 order sales
            discount,                      // 할인 금액 discount
            1000,                      // 배송비 delivery charge
            payment,                        // 결제 방법 payment
            null              // 결제 프로퍼티 properties
        );
    }
}

function viewHome() {
    sendDataToLogging("viewHome Called");
    const param = {
        method_name: AdbrixMethodName.viewHome
    }

    if (isAndroidBridgeAvailable()) {
        sendDataToLogging("viewHome called. Android");
        adbrixBridge.invoke(JSON.stringify(param));
    } else if (isIosBridgeAvailable()) {
        sendDataToLogging("viewHome called. IOS");
        window.webkit.messageHandlers.adbrixBridge.postMessage(param);
    } else {
        sendDataToLogging("viewHome called. WEB");
        adbrix.viewHome();
    }
}

function userProperty() {
    var age = Number($('#userProperty_AgeInput').val());
    var gender = Number($('input[name=userProperty_Gender]:checked').val());
    var usernick = $('#userProperty_UsernickInput').val();
    var place = $('#userProperty_PlaceInput').val();
    var height = $('#userProperty_HeightInput').val();
    var married = $('input[name=userProperty_Married]:checked').val();
    console.log("place:::" + place);
    console.log("usernick:::" + usernick);
    console.log("age:::::" + age);
    console.log("gender:::::" + gender);
    console.log("height:::::" + height);
    console.log("married:::::" + married);
    if (isAndroidBridgeAvailable()) {
        adbrixBridge.invoke(param);
    } else if (isIosBridgeAvailable()) {
        window.webkit.messageHandlers.adbrixBridge.postMessage(param);
    } else {
        adbrix.userProperty.addOrUpdate('age', age);
        adbrix.userProperty.addOrUpdate('gender', gender);
        adbrix.userProperty.addOrUpdate('usernick', usernick);
        adbrix.userProperty.addOrUpdate('place', place);
        adbrix.userProperty.addOrUpdate('height', height);
        adbrix.userProperty.addOrUpdate('married', married);
    }
}

function phoneNumber(){
    var phoneNumberInput = $('#phoneNumberInput').val(); // phoneNumber 가져오는 방식 GA 팀과 SDK 팀에 확인 필요 or 기획팀에게도 확인 필요
    adbrix.setPhoneNumber(phoneNumberInput).then(result => {
        if (result.is_success) {
            console.log("phoneNumber ::: "+result);
        }
    });
}

function kakaoId(){
    var kakaoId = $('#kakaoId').val(); // web_sdk kakao sdk 연동필요
    adbrix.setKakaoId(kakaoId).then(result => {
        if (result.is_success) {
            console.log("kakaoId ::: "+result);
        }
    });
}

function customEvent() {
    var customkey = $('#custom_KeyInput').val();
    var customValue = $('#custom_ValueInput').val();
    
    // var inputDates = new Date();   // Thu Aug 24 2023 12:22:17 GMT+0900
    // var month = '0' + inputDates.getMonth();
    // var days = '0' + inputDates.getDay();
    // var dateFormat = inputDates.getFullYear() + "-" + month + "-" + days + "T00:00:00Z";
    // console.log("dateFormat :: " + dateFormat);
    // var testcustomkey = "조나단"
    // var testcustomValue = "제주도"
    // adbrix.event.send('ขอบคุณนะครับ레!@#$%^&*()_+WWaa~-|}{:/,.<>?', { customkey: customValue })
    // adbrix.event.send('william', { customkey: customValue })
    // adbrix.event.send('thomas', { customkey: customValue })
    adbrix.event.send(customkey, { customkey: customValue })
    // adbrix.event.send(customkey, dateFormat );
    // adbrix.event.send(testcustomkey, { customValu: testcustomValue })
}

function userInvite() {
    var SignChannel = $("#SignChannel option:selected").val();
    var age = $('#userRegister_AgeInput').val();
    var gender = $('input[name=userRegister_Gender]:checked').val();
    var married = $('input[name=userRegister_Married]:checked').val();
    console.log("SignChannel:::" + SignChannel);
    console.log("age:::::" + age);
    console.log("gender:::::" + gender);
    console.log("married:::::" + married);
    if (isAndroidBridgeAvailable()) {
        adbrixBridge.invoke(param);
    } else if (isIosBridgeAvailable()) {
        window.webkit.messageHandlers.adbrixBridge.postMessage(param);
    } else {
        adbrix.common.invite(SignChannel, "william", { "userInvite": "userInvite", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });
    }
}

function usingCredit() {
    var age = $('#userRegister_AgeInput').val();
    var gender = $('input[name=userRegister_Gender]:checked').val();
    var married = $('input[name=userRegister_Married]:checked').val();
    var credit = Number($('#usingCredit_CreditInput').val());
    console.log("credit:::" + credit);
    console.log("age:::::" + age);
    console.log("gender:::::" + gender);
    console.log("married:::::" + married);
    if (isAndroidBridgeAvailable()) {
        adbrixBridge.invoke(param);
    } else if (isIosBridgeAvailable()) {
        window.webkit.messageHandlers.adbrixBridge.postMessage(param);
    } else {
        adbrix.common.useCredit(credit, { "usingCredit": "usingCredit", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });
    }
}

/** 구매하기 addToCart */
function addToCart() {
    var productId = $('#purchase_productIDInput').val();
    var productName = $('#purchase_productNameInput').val();
    var price = Number($('#purchase_priceInput').val());
    var quantity = Number($('#purchase_quantityInput').val());
    var currencyEnum = $("#currencyEnum option:selected").val();
    var categories = { category1: "category1", category2: "category2", category3: "category3", category4: "category4" };
    console.log("productId:::::" + productId);
    console.log("productName:::::" + productName);
    console.log("price:::::" + price);
    console.log("quantity:::::" + quantity);
    console.log("currencyEnum:::::" + currencyEnum);

    if (isAndroidBridgeAvailable()) {
        Android.addToCart(productId, productName, price, quantity, currencyEnum, categories);
    } else if (isIosBridgeAvailable()) {

    } else {
        const deviceId = adbrix.getDeviceId();
        console.log(deviceId);
        console.log("deviceID 가져오기 api 임의 연동")
        console.log("커머스 이벤트 추가되어 있습니다.")
    }
}

function viewList() {
    var productId = $('#purchase_productIDInput').val();
    var productName = $('#purchase_productNameInput').val();
    var price = Number($('#purchase_priceInput').val());
    var quantity = Number($('#purchase_quantityInput').val());
    var currencyEnum = $("#currencyEnum option:selected").val();
    var categories = { category1: "category1", category2: "category2", category3: "category3", category4: "category4" };
    console.log("productId:::::" + productId);
    console.log("productName:::::" + productName);
    console.log("price:::::" + price);
    console.log("quantity:::::" + quantity);
    console.log("currencyEnum:::::" + currencyEnum);
    if (isAndroidBridgeAvailable()) {
        Android.viewList(productId, productName, price, quantity, currencyEnum, categories);
    } else if (isIosBridgeAvailable()) {

    } else {
        console.log("커머스 이벤트 추가되어 있습니다.")
    }
}

function addToWishList() {
    var productId = $('#purchase_productIDInput').val();
    var productName = $('#purchase_productNameInput').val();
    var price = Number($('#purchase_priceInput').val());
    var quantity = Number($('#purchase_quantityInput').val());
    var currencyEnum = $("#currencyEnum option:selected").val();
    var categories = { category1: "category1", category2: "category2", category3: "category3", category4: "category4" };
    console.log("productId:::::" + productId);
    console.log("productName:::::" + productName);
    console.log("price:::::" + price);
    console.log("quantity:::::" + quantity);
    console.log("currencyEnum:::::" + currencyEnum);
    if (isAndroidBridgeAvailable()) {
        Android.addToWishList(productId, productName, price, quantity, currencyEnum, categories);
    } else if (isIosBridgeAvailable()) {

    } else {
        console.log("커머스 이벤트 추가되어 있습니다.")
    }
}

function share() {
    var productId = $('#purchase_productIDInput').val();
    var productName = $('#purchase_productNameInput').val();
    var price = Number($('#purchase_priceInput').val());
    var quantity = Number($('#purchase_quantityInput').val());
    var currencyEnum = $("#currencyEnum option:selected").val();
    var categories = { category1: "category1", category2: "category2", category3: "category3", category4: "category4" };
    console.log("productId:::::" + productId);
    console.log("productName:::::" + productName);
    console.log("price:::::" + price);
    console.log("quantity:::::" + quantity);
    console.log("currencyEnum:::::" + currencyEnum);
    if (isAndroidBridgeAvailable()) {
        Android.share(SignChannel, productId, productName, price, quantity, currencyEnum, categories);
    } else if (isIosBridgeAvailable()) {

    } else {
        console.log("커머스 이벤트 추가되어 있습니다.")
    }
}

function category() {
    var commerce_size = $('#commerce_size').val();
    var commerce_color = $('#commerce_color').val();
    var commerce_VIP = $('input[name=commerce_VIP]:checked').val();
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_productId = $('#commerce_productIDInput').val();
    var commerce_productName = $('#commerce_productNameInput').val();
    var commerce_price = Number($('#commerce_priceInput').val());
    var commerce_quantity = Number($('#commerce_quantityInput').val());
    var commerce_discount = Number($('#commerce_discountInput').val());
    var commerce_currencyEnum = $("#commerce_currencyEnum option:selected").val();
    console.log("commerce_size:::::" + commerce_size);
    console.log("commerce_color:::::" + commerce_color);
    console.log("commerce_VIP:::::" + commerce_VIP);
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_productId:::::" + commerce_productId);
    console.log("commerce_productName:::::" + commerce_productName);
    console.log("commerce_price:::::" + commerce_price);
    console.log("commerce_quantity:::::" + commerce_quantity);
    console.log("commerce_discount:::::" + commerce_discount);
    console.log("commerce_currencyEnum:::::" + commerce_currencyEnum);

    let products = [];

    const categories = adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아');
    const product = adbrix.commerceAttr.product('test_product_id', '상품명', 1000, 5, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'categories', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });
    products.push(product);

    // @ts-ignore
    // adbrix.commerce.categoryView();
    // @ts-ignore
    // adbrix.commerce.categoryView('한글');
    // @ts-ignore
    // adbrix.commerce.categoryView(categories);
    // @ts-ignore
    // adbrix.commerce.categoryView(categories, {});
    // @ts-ignore
    // adbrix.commerce.categoryView(categories, product);
    // @ts-ignore
    // adbrix.commerce.categoryView(categories, products, []);

    // adbrix.commerce.categoryView(categories, products);
    // adbrix.commerce.categoryView(categories, products, { 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/' });
    adbrix.commerce.categoryView(categories, products, { 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });

    // console.log(adbrix.commerce.categoryView(categories, products));
    // console.log(adbrix.commerce.categoryView(categories, products, { 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" }));

    if (isAndroidBridgeAvailable()) {
        Android.category_event(commerce_size, commerce_color, commerce_VIP, commerce_grade, commerce_howmany_buy, commerce_productId, commerce_productName, commerce_price, commerce_quantity, commerce_discount, commerce_currencyEnum, categories);
    } else if (isIosBridgeAvailable()) {

    } else {

    }
}

function productDetail() {
    var commerce_size = $('#commerce_size').val();
    var commerce_color = $('#commerce_color').val();
    var commerce_VIP = $('input[name=commerce_VIP]:checked').val();
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_productId = $('#commerce_productIdInput').val();
    var commerce_productName = $('#commerce_productNameInput').val();
    var commerce_price = Number($('#commerce_priceInput').val());
    var commerce_quantity = Number($('#commerce_quantityInput').val());
    var commerce_discount = Number($('#commerce_discountInput').val());
    var commerce_currencyEnum = $("#commerce_currencyEnum option:selected").val();
    console.log("commerce_size:::::" + commerce_size);
    console.log("commerce_color:::::" + commerce_color);
    console.log("commerce_VIP:::::" + commerce_VIP);
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_productId:::::" + commerce_productId);
    console.log("commerce_productName:::::" + commerce_productName);
    console.log("commerce_price:::::" + commerce_price);
    console.log("commerce_quantity:::::" + commerce_quantity);
    console.log("commerce_discount:::::" + commerce_discount);
    console.log("commerce_currencyEnum:::::" + commerce_currencyEnum);

    const product = adbrix.commerceAttr.product('test_product_id', '상품명', 1000, 5, 200, 'KRW', adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'test', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });

    let products = [];
    products.push(product);
    // @ts-ignore
    // adbrix.commerce.productView();
    // @ts-ignore
    // adbrix.commerce.productView('한글');
    // @ts-ignore
    // adbrix.commerce.productView(products);

    // adbrix.commerce.productView(product);
    // adbrix.commerce.productView(product, { 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/' });
    adbrix.commerce.productView(product, { 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });

    // console.log(adbrix.commerce.productView(product));
    // console.log(adbrix.commerce.productView(product, { 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" }));

    if (isAndroidBridgeAvailable()) {
        Android.productDetail(commerce_size, commerce_color, commerce_VIP, commerce_grade, commerce_howmany_buy, commerce_productId, commerce_productName, commerce_price, commerce_quantity, commerce_discount, commerce_currencyEnum, categories);
    } else if (isIosBridgeAvailable()) {

    } else {

    }

}

function commerce_addToCart() {
    var commerce_size = $('#commerce_size').val();
    var commerce_color = $('#commerce_color').val();
    var commerce_VIP = $('input[name=commerce_VIP]:checked').val();
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_productId = $('#commerce_productIdInput').val();
    var commerce_productName = $('#commerce_productNameInput').val();
    var commerce_price = Number($('#commerce_priceInput').val());
    var commerce_quantity = Number($('#commerce_quantityInput').val());
    var commerce_discount = Number($('#commerce_discountInput').val());
    var commerce_currencyEnum = $("#commerce_currencyEnum option:selected").val();
    console.log("commerce_size:::::" + commerce_size);
    console.log("commerce_color:::::" + commerce_color);
    console.log("commerce_VIP:::::" + commerce_VIP);
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_productId:::::" + commerce_productId);
    console.log("commerce_productName:::::" + commerce_productName);
    console.log("commerce_price:::::" + commerce_price);
    console.log("commerce_quantity:::::" + commerce_quantity);
    console.log("commerce_discount:::::" + commerce_discount);
    console.log("commerce_currencyEnum:::::" + commerce_currencyEnum);

    let addTocart_products = [];
    for (var i = 0; i <= 99; i++) {
        console.log(i);
        const product = adbrix.commerceAttr.product('test_product_id' + i, 'product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5', 30, 30, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'addtocart for', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });
        addTocart_products.push(product);
    }
    adbrix.commerce.addToCart(addTocart_products, { 'key': 'value' });

    var product_itme_1 = adbrix.commerceAttr.product('product_id_1', '상품명', 1000, 5, 200, 'KRW', adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'key': 'value' });
    var products_itme = [];
    products_itme.push(product_itme_1);
    adbrix.commerce.addToCart(products_itme, { 'key': 'value' });
    var product_itme_2 = adbrix.commerceAttr.product('product_id_2', '상품명', 1000, 5, 200, 'KRW', adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'key': 'value' });
    products_itme.push(product_itme_2);
    adbrix.commerce.addToCart(products_itme, { 'key': 'value' });

    adbrix.commerce.addToCart(product_itme_1, { 'key': 'value' });
    if (isAndroidBridgeAvailable()) {
        Android.commerce_addToCart(commerce_size, commerce_color, commerce_VIP, commerce_grade, commerce_howmany_buy, commerce_productId, commerce_productName, commerce_price, commerce_quantity, commerce_discount, commerce_currencyEnum, categories);
    } else if (isIosBridgeAvailable()) {

    } else {

    }
}

function commerce_addToWishList() {
    var commerce_size = $('#commerce_size').val();
    var commerce_color = $('#commerce_color').val();
    var commerce_VIP = $('input[name=commerce_VIP]:checked').val();
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_productId = $('#commerce_productIdInput').val();
    var commerce_productName = $('#commerce_productNameInput').val();
    var commerce_price = Number($('#commerce_priceInput').val());
    var commerce_quantity = Number($('#commerce_quantityInput').val());
    var commerce_discount = Number($('#commerce_discountInput').val());
    var commerce_currencyEnum = $("#commerce_currencyEnum option:selected").val();
    console.log("commerce_size:::::" + commerce_size);
    console.log("commerce_color:::::" + commerce_color);
    console.log("commerce_VIP:::::" + commerce_VIP);
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_productId:::::" + commerce_productId);
    console.log("commerce_productName:::::" + commerce_productName);
    console.log("commerce_price:::::" + commerce_price);
    console.log("commerce_quantity:::::" + commerce_quantity);
    console.log("commerce_discount:::::" + commerce_discount);
    console.log("commerce_currencyEnum:::::" + commerce_currencyEnum);

    let addToWishList_products = [];
    for (var i = 0; i <= 99; i++) {
        console.log('addToWishList' + i);
        const addToWishList_product = adbrix.commerceAttr.product('test_product_id' + i, 'product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5_product5', 30, 30, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'wishlistfor', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });
        addToWishList_products.push(addToWishList_product);
    }

    adbrix.commerce.addToWishList(addToWishList_products, { 'key': 'value' });

    var product_itme_1 = adbrix.commerceAttr.product('product_id_1', '상품명', 1000, 5, 200, 'KRW', adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'key': 'value' });
    var products_itme = [];
    products_itme.push(product_itme_1);
    adbrix.commerce.addToWishList(products_itme, { 'key': 'value' });
    var product_itme_2 = adbrix.commerceAttr.product('product_id_2', '상품명', 1000, 5, 200, 'KRW', adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'key': 'value' });
    products_itme.push(product_itme_2);
    adbrix.commerce.addToWishList(products_itme, { 'key': 'value' });
    adbrix.commerce.addToWishList(product_itme_1, { 'key': 'value' });

    if (isAndroidBridgeAvailable()) {
        Android.commerce_addToWishList(commerce_size, commerce_color, commerce_VIP, commerce_grade, commerce_howmany_buy, commerce_productId, commerce_productName, commerce_price, commerce_quantity, commerce_discount, commerce_currencyEnum, categories);
    } else if (isIosBridgeAvailable()) {

    } else {

    }
}

function reviewOrder() {
    var commerce_size = $('#commerce_size').val();
    var commerce_color = $('#commerce_color').val();
    var commerce_VIP = $('input[name=commerce_VIP]:checked').val();
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_productId = $('#commerce_productIdInput').val();
    var commerce_productName = $('#commerce_productNameInput').val();
    var commerce_price = Number($('#commerce_priceInput').val());
    var commerce_quantity = Number($('#commerce_quantityInput').val());
    var commerce_discount = Number($('#commerce_discountInput').val());
    var commerce_currencyEnum = $("#commerce_currencyEnum option:selected").val();
    console.log("commerce_size:::::" + commerce_size);
    console.log("commerce_color:::::" + commerce_color);
    console.log("commerce_VIP:::::" + commerce_VIP);
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_productId:::::" + commerce_productId);
    console.log("commerce_productName:::::" + commerce_productName);
    console.log("commerce_price:::::" + commerce_price);
    console.log("commerce_quantity:::::" + commerce_quantity);
    console.log("commerce_discount:::::" + commerce_discount);
    console.log("commerce_currencyEnum:::::" + commerce_currencyEnum);

    const product = adbrix.commerceAttr.product('test_product_id', '상품명', 1000, 5, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'test', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });

    let products = [];
    products.push(product);
    // @ts-ignore
    // adbrix.commerce.reviewOrder();
    // @ts-ignore
    // adbrix.commerce.reviewOrder('한글');
    // @ts-ignore
    // adbrix.commerce.reviewOrder('orderid_1', products, 'test');
    // @ts-ignore
    // adbrix.commerce.reviewOrder(product);

    // adbrix.commerce.reviewOrder('orderid_1', products);
    // adbrix.commerce.reviewOrder('orderid_1', products, 10);
    // adbrix.commerce.reviewOrder('orderid_1', products, 10, 20);
    // adbrix.commerce.reviewOrder('orderid_1', products, 10, 20, { 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/' });
    adbrix.commerce.reviewOrder('orderid_1', products, 10, 20, { 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });

    // console.log(adbrix.commerce.reviewOrder('orderid_1', products));
    // console.log(adbrix.commerce.reviewOrder('orderid_1', products, 10));
    // console.log(adbrix.commerce.reviewOrder('orderid_1', products, 10, 20));
    // console.log(adbrix.commerce.reviewOrder('orderid_1', products, 10, 20, { 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" }));

    if (isAndroidBridgeAvailable()) {
        Android.reviewOrder(commerce_size, commerce_color, commerce_VIP, commerce_grade, commerce_howmany_buy, commerce_productId, commerce_productName, commerce_price, commerce_quantity, commerce_discount, commerce_currencyEnum, categories);
    } else if (isIosBridgeAvailable()) {

    } else {

    }
}

function refundOrder() {
    var commerce_size = $('#commerce_size').val();
    var commerce_color = $('#commerce_color').val();
    var commerce_VIP = $('input[name=commerce_VIP]:checked').val();
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_productId = $('#commerce_productIdInput').val();
    var commerce_productName = $('#commerce_productNameInput').val();
    var commerce_price = Number($('#commerce_priceInput').val());
    var commerce_quantity = Number($('#commerce_quantityInput').val());
    var commerce_discount = Number($('#commerce_discountInput').val());
    var commerce_currencyEnum = $("#commerce_currencyEnum option:selected").val();
    console.log("commerce_size:::::" + commerce_size);
    console.log("commerce_color:::::" + commerce_color);
    console.log("commerce_VIP:::::" + commerce_VIP);
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_productId:::::" + commerce_productId);
    console.log("commerce_productName:::::" + commerce_productName);
    console.log("commerce_price:::::" + commerce_price);
    console.log("commerce_quantity:::::" + commerce_quantity);
    console.log("commerce_discount:::::" + commerce_discount);
    console.log("commerce_currencyEnum:::::" + commerce_currencyEnum);

    const product = adbrix.commerceAttr.product('test_product_id', '상품명', 1000, 5, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'test', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });

    let products = [];
    products.push(product);

    // @ts-ignore
    // adbrix.commerce.refund();
    // @ts-ignore
    // adbrix.commerce.refund('한글');
    // @ts-ignore
    // adbrix.commerce.refund('orderid_1', products, 'test');
    // @ts-ignore
    // adbrix.commerce.refund(product);

    // adbrix.commerce.refund('orderid_1', products);
    // adbrix.commerce.refund('orderid_1', products, 10);
    // adbrix.commerce.refund('orderid_1', products, 10);
    // adbrix.commerce.refund('orderid_1', products, 10, { 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/' });

    // console.log(adbrix.commerce.refund('orderid_1', products));
    // console.log(adbrix.commerce.refund('orderid_1', products, 10));
    // console.log(adbrix.commerce.refund('orderid_1', products, 10));
    adbrix.commerce.refund('orderid_1', products, 10, { 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });


    if (isAndroidBridgeAvailable()) {
        Android.refundOrder(commerce_size, commerce_color, commerce_VIP, commerce_grade, commerce_howmany_buy, commerce_productId, commerce_productName, commerce_price, commerce_quantity, commerce_discount, commerce_currencyEnum, categories);
    } else if (isIosBridgeAvailable()) {

    } else {

    }
}

function searchProduct() {
    var commerce_size = $('#commerce_size').val();
    var commerce_color = $('#commerce_color').val();
    var commerce_VIP = $('input[name=commerce_VIP]:checked').val();
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_productId = $('#commerce_productIdInput').val();
    var commerce_productName = $('#commerce_productNameInput').val();
    var commerce_price = Number($('#commerce_priceInput').val());
    var commerce_quantity = Number($('#commerce_quantityInput').val());
    var commerce_discount = Number($('#commerce_discountInput').val());
    var commerce_currencyEnum = $("#commerce_currencyEnum option:selected").val();
    console.log("commerce_size:::::" + commerce_size);
    console.log("commerce_color:::::" + commerce_color);
    console.log("commerce_VIP:::::" + commerce_VIP);
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_productId:::::" + commerce_productId);
    console.log("commerce_productName:::::" + commerce_productName);
    console.log("commerce_price:::::" + commerce_price);
    console.log("commerce_quantity:::::" + commerce_quantity);
    console.log("commerce_discount:::::" + commerce_discount);
    console.log("commerce_currencyEnum:::::" + commerce_currencyEnum);

    const product = adbrix.commerceAttr.product('test_product_id', '상품명', 1000, 5, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'test', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });

    let products = [];
    products.push(product);

    // @ts-ignore
    // adbrix.commerce.search();
    // @ts-ignore
    // adbrix.commerce.search(null);
    // @ts-ignore
    // adbrix.commerce.search('keyword', products, 'test');
    // @ts-ignore
    // adbrix.commerce.search(product);

    // adbrix.commerce.search('keyword', products);
    // adbrix.commerce.search('keyword', products,);
    adbrix.commerce.search('keyword', products, { 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });

    // console.log(adbrix.commerce.search('keyword', products));
    // console.log(adbrix.commerce.search('keyword', products,));
    // console.log(adbrix.commerce.search('keyword', products, { 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" }));

    if (isAndroidBridgeAvailable()) {
        Android.searchProduct(commerce_size, commerce_color, commerce_VIP, commerce_grade, commerce_howmany_buy, commerce_productId, commerce_productName, commerce_price, commerce_quantity, commerce_discount, commerce_currencyEnum, categories);
    } else if (isIosBridgeAvailable()) {

    } else {

    }
}

function shareProduct() {
    var commerce_size = $('#commerce_size').val();
    var commerce_color = $('#commerce_color').val();
    var commerce_VIP = $('input[name=commerce_VIP]:checked').val();
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_productId = $('#commerce_productIdInput').val();
    var commerce_productName = $('#commerce_productNameInput').val();
    var commerce_price = Number($('#commerce_priceInput').val());
    var commerce_quantity = Number($('#commerce_quantityInput').val());
    var commerce_discount = Number($('#commerce_discountInput').val());
    var commerce_currencyEnum = $("#commerce_currencyEnum option:selected").val();
    var commerce_signChannel = $("#commerce_signChannel option:selected").val();
    console.log("commerce_size:::::" + commerce_size);
    console.log("commerce_color:::::" + commerce_color);
    console.log("commerce_VIP:::::" + commerce_VIP);
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_productId:::::" + commerce_productId);
    console.log("commerce_productName:::::" + commerce_productName);
    console.log("commerce_price:::::" + commerce_price);
    console.log("commerce_quantity:::::" + commerce_quantity);
    console.log("commerce_discount:::::" + commerce_discount);
    console.log("commerce_currencyEnum:::::" + commerce_currencyEnum);
    console.log("commerce_signChannel:::::" + commerce_signChannel);

    const product = adbrix.commerceAttr.product('test_product_id', '상품명', 1000, 5, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'test', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });

    let products = [];
    products.push(product);

    // @ts-ignore
    // adbrix.commerce.share();
    // @ts-ignore
    // adbrix.commerce.share(null);
    // @ts-ignore
    // adbrix.commerce.share('keyword', products, 'test');
    // @ts-ignore
    // adbrix.commerce.share(product);

    // 확인 필요
    // adbrix.commerce.share(commerce_signChannel, products);
    // adbrix.commerce.share(commerce_signChannel, products,);
    // adbrix.commerce.share(commerce_signChannel, products, { 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/' });

    adbrix.commerce.share(commerce_signChannel, products, { 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });

    // console.log(adbrix.commerce.share(commerce_signChannel, products));
    // console.log(adbrix.commerce.share(commerce_signChannel, products,));
    // console.log(adbrix.commerce.share(commerce_signChannel, products, { 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" }));

    if (isAndroidBridgeAvailable()) {
        Android.shareProduct(commerce_size, commerce_color, commerce_VIP, commerce_grade, commerce_howmany_buy, commerce_productId, commerce_productName, commerce_price, commerce_quantity, commerce_discount, commerce_currencyEnum, categories);
    } else if (isIosBridgeAvailable()) {

    } else {

    }
}

function listViewProducts() {
    var commerce_size = $('#commerce_size').val();
    var commerce_color = $('#commerce_color').val();
    var commerce_VIP = $('input[name=commerce_VIP]:checked').val();
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_productId = $('#commerce_productIdInput').val();
    var commerce_productName = $('#commerce_productNameInput').val();
    var commerce_price = Number($('#commerce_priceInput').val());
    var commerce_quantity = Number($('#commerce_quantityInput').val());
    var commerce_discount = Number($('#commerce_discountInput').val());
    var commerce_currencyEnum = $("#commerce_currencyEnum option:selected").val();
    console.log("commerce_size:::::" + commerce_size);
    console.log("commerce_color:::::" + commerce_color);
    console.log("commerce_VIP:::::" + commerce_VIP);
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_productId:::::" + commerce_productId);
    console.log("commerce_productName:::::" + commerce_productName);
    console.log("commerce_price:::::" + commerce_price);
    console.log("commerce_quantity:::::" + commerce_quantity);
    console.log("commerce_discount:::::" + commerce_discount);
    console.log("commerce_currencyEnum:::::" + commerce_currencyEnum);

    const product = adbrix.commerceAttr.product('test_product_id', '상품명', 1000, 5, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'test', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });

    let products = [];
    products.push(product);

    // @ts-ignore
    // adbrix.commerce.listView();
    // @ts-ignore
    // adbrix.commerce.listView('한글');
    // @ts-ignore
    // adbrix.commerce.listView(product);

    // adbrix.commerce.listView(products);
    adbrix.commerce.listView(products, { 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });

    // console.log(adbrix.commerce.listView(products));
    // console.log(adbrix.commerce.listView(products, { 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" }));

    if (isAndroidBridgeAvailable()) {
        Android.listViewProducts(commerce_size, commerce_color, commerce_VIP, commerce_grade, commerce_howmany_buy, commerce_productId, commerce_productName, commerce_price, commerce_quantity, commerce_discount, commerce_currencyEnum, categories);
    } else if (isIosBridgeAvailable()) {

    } else {

    }
}

function cartViewProducts() {
    var commerce_size = $('#commerce_size').val();
    var commerce_color = $('#commerce_color').val();
    var commerce_VIP = $('input[name=commerce_VIP]:checked').val();
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_productId = $('#commerce_productIdInput').val();
    var commerce_productName = $('#commerce_productNameInput').val();
    var commerce_price = Number($('#commerce_priceInput').val());
    var commerce_quantity = Number($('#commerce_quantityInput').val());
    var commerce_discount = Number($('#commerce_discountInput').val());
    var commerce_currencyEnum = $("#commerce_currencyEnum option:selected").val();
    console.log("commerce_size:::::" + commerce_size);
    console.log("commerce_color:::::" + commerce_color);
    console.log("commerce_VIP:::::" + commerce_VIP);
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_productId:::::" + commerce_productId);
    console.log("commerce_productName:::::" + commerce_productName);
    console.log("commerce_price:::::" + commerce_price);
    console.log("commerce_quantity:::::" + commerce_quantity);
    console.log("commerce_discount:::::" + commerce_discount);
    console.log("commerce_currencyEnum:::::" + commerce_currencyEnum);

    const product = adbrix.commerceAttr.product('test_product_id', '상품명', 1000, 5, 200, commerce_currencyEnum, adbrix.commerceAttr.categories('게임', '소셜', '커머스', '여성', '육아'), { 'test': 'test', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });

    let products = [];
    products.push(product);

    // @ts-ignore
    // adbrix.commerce.cartView();
    // @ts-ignore
    // adbrix.commerce.cartView('한글');
    // @ts-ignore
    // adbrix.commerce.cartView(product);

    // adbrix.commerce.cartView(products);
    adbrix.commerce.cartView(products, { 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });

    // console.log(adbrix.commerce.cartView(products));
    // console.log(adbrix.commerce.cartView(products, { 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" }));

    if (isAndroidBridgeAvailable()) {
        Android.cartViewProducts(commerce_size, commerce_color, commerce_VIP, commerce_grade, commerce_howmany_buy, commerce_productId, commerce_productName, commerce_price, commerce_quantity, commerce_discount, commerce_currencyEnum, categories);
    } else if (isIosBridgeAvailable()) {

    } else {

    }
}

function paymentInfoAdded() {
    var commerce_grade = $('#commerce_grade').val();
    var commerce_howmany_buy = $('#commerce_howmany_buy').val();
    var commerce_discount = Number($('#commerce_discountInput').val());
    console.log("commerce_grade:::::" + commerce_grade);
    console.log("commerce_howmany_buy:::::" + commerce_howmany_buy);
    console.log("commerce_discount:::::" + commerce_discount);

    // @ts-ignore
    // adbrix.commerce.paymentInfoAdded('한글');

    // adbrix.commerce.paymentInfoAdded();
    adbrix.commerce.paymentInfoAdded({ 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" });

    // console.log(adbrix.commerce.paymentInfoAdded());
    // console.log(adbrix.commerce.paymentInfoAdded({ 'test': 'https://web-sdk-prod-sec-dir.public.sre.dfinery.io/', "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/" }));

    if (isAndroidBridgeAvailable()) {
        Android.paymentInfoAdded(commerce_grade, commerce_howmany_buy, commerce_discount);
        showAndroidToast("payment");
    } else if (isIosBridgeAvailable()) {

    } else {

    }
}

function tutorialComplete() {
    var game_grade = $('#game_grade').val();
    var game_howmany_buy = $('#game_howmany_buy').val();
    var game_tutorial = $('input[name=game_tutorial]:checked').val();
    var game_discount = $('input[name=game_discount]:checked').val();
    console.log("game_grade:::::" + game_grade);
    console.log("game_howmany_buy:::::" + game_howmany_buy);
    console.log("game_tutorial:::::" + game_tutorial);
    console.log("game_discount:::::" + game_discount);

    const gameAttr = {
        'grade': 'vip',
        'howmany_buy': 36,
        'discount': true,
        "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/",
    };

    // @ts-ignore
    // adbrix.game.tutorialComplete('한글');
    // @ts-ignore
    // adbrix.game.tutorialComplete(true, '테스트');
    // @ts-ignore
    // adbrix.game.tutorialComplete(null, gameAttr);

    // adbrix.game.tutorialComplete(true);
    adbrix.game.tutorialComplete(true, gameAttr);

    // console.log(adbrix.game.tutorialComplete(true));
    // console.log(adbrix.game.tutorialComplete(true, gameAttr));

    if (isAndroidBridgeAvailable()) {
        Android.tutorialComplete(game_grade, game_howmany_buy, game_discount, game_tutorial);
        showAndroidToast("tutorial");
    } else if (isIosBridgeAvailable()) {

    } else {

    }
}

function characterCreated() {
    var game_grade = $('#game_grade').val();
    var game_howmany_buy = $('#game_howmany_buy').val();
    var game_discount = $('input[name=game_discount]:checked').val();
    console.log("game_grade:::::" + game_grade);
    console.log("game_howmany_buy:::::" + game_howmany_buy);
    console.log("game_discount:::::" + game_discount);

    const gameAttr = {
        'grade': 'vip',
        'howmany_buy': 36,
        'discount': true,
        "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/",
    };

    // @ts-ignore
    // adbrix.game.characterCreated('한글');
    // @ts-ignore
    // adbrix.game.characterCreated(true, '테스트');

    // adbrix.game.characterCreated();
    adbrix.game.characterCreated(gameAttr);

    // console.log(adbrix.game.characterCreated());
    // console.log(adbrix.game.characterCreated(gameAttr));

    if (isAndroidBridgeAvailable()) {
        Android.characterCreated(game_grade, game_howmany_buy, game_discount);
        showAndroidToast("character");
    } else if (isIosBridgeAvailable()) {

    } else {

    }
}

function stageCleared() {
    var game_grade = $('#game_grade').val();
    var game_howmany_buy = $('#game_howmany_buy').val();
    var game_discount = $('input[name=game_discount]:checked').val();
    var game_stageCleared = $("#stageCleared option:selected").val();
    console.log("game_grade:::::" + game_grade);
    console.log("game_howmany_buy:::::" + game_howmany_buy);
    console.log("game_stageCleared:::::" + game_stageCleared);
    console.log("game_discount:::::" + game_discount);

    const gameAttr = {
        'grade': 'vip',
        'howmany_buy': 36,
        'discount': true,
        "test1": null, "test2": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test3": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test4": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test5": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test6": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test7": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/", "test8": "https://web-sdk-prod-sec-dir.public.sre.dfinery.io/",
    };

    // @ts-ignore
    // adbrix.game.stageCleared(123213);
    // @ts-ignore
    // adbrix.game.stageCleared(null);
    // @ts-ignore
    // adbrix.game.stageCleared();
    // @ts-ignore
    // adbrix.game.stageCleared(true);
    // @ts-ignore
    // adbrix.game.stageCleared({});
    // @ts-ignore
    // adbrix.game.stageCleared(true, '테스트');

    // adbrix.game.stageCleared('1-5');
    adbrix.game.stageCleared('1-5', gameAttr);

    // console.log(adbrix.game.stageCleared('1-5'));
    // console.log(adbrix.game.stageCleared('1-5', gameAttr));

    if (isAndroidBridgeAvailable()) {
        Android.stageCleared(game_grade, game_howmany_buy, game_discount, game_stageCleared);
        showAndroidToast("stage");
    } else if (isIosBridgeAvailable()) {

    } else {

    }
}

function levelAchieved() {
    var game_grade = $('#game_grade').val();
    var game_howmany_buy = $('#game_howmany_buy').val();
    var game_discount = $('input[name=game_discount]:checked').val();
    var game_levelAchieved = $('#game_levelAchieved').val();
    console.log("game_grade:::::" + game_grade);
    console.log("game_howmany_buy:::::" + game_howmany_buy);
    console.log("game_levelAchieved:::::" + game_levelAchieved);
    console.log("game_discount:::::" + game_discount);

    const gameAttr = {
        'grade': 'vip',
        'howmany_buy': 36,
        'discount': true,
        'event': null,
        'event1': 'test'
    };

    // @ts-ignore
    // adbrix.game.levelAchieved('123213');
    // @ts-ignore
    // adbrix.game.levelAchieved(null);
    // @ts-ignore
    // adbrix.game.levelAchieved();
    // @ts-ignore
    // adbrix.game.levelAchieved(true);
    // @ts-ignore
    // adbrix.game.levelAchieved({});
    // @ts-ignore
    // adbrix.game.levelAchieved(true, '테스트');

    // adbrix.game.levelAchieved(1);
    adbrix.game.levelAchieved(1, gameAttr);

    // console.log(adbrix.game.levelAchieved(1));
    // console.log(adbrix.game.levelAchieved(1, gameAttr));

    if (isAndroidBridgeAvailable()) {
        Android.levelAchieved(game_grade, game_howmany_buy, game_discount, game_levelAchieved);
        showAndroidToast("level");
    } else if (isIosBridgeAvailable()) {

    } else {

    }
}

function showAndroidToast(toast) {
    if (isAndroidBridgeAvailable()) {
        Android.showToast(toast);
    } else if (isIosBridgeAvailable()) {

    } else {

    }
}
var url = $('#url').val()

function GoogelURL(url) {

}

// 알림 function
function informativeNotification() {
    var informativeSwitch = document.getElementById("informativeSwitch");
    if (informativeSwitch.checked == true) {
        console.log("informative Notification on");
        const subscriptionStatus = {
            //업데이트할 항목만 입력
            informative_notification_flag: true
        };
        adbrix.setSubscriptionStatus(subscriptionStatus).then(result => {
            if (result.is_success) {
                //성공
            }
        });
    } else {
        console.log("informative Notification off");
        const subscriptionStatus = {
            //업데이트할 항목만 입력
            informative_notification_flag: false
        };
        adbrix.setSubscriptionStatus(subscriptionStatus).then(result => {
            if (result.is_success) {
                //성공
            }
        });
    }
}

function marketingNotification() {
    var marketingSwitch = document.getElementById("marketingSwitch");
    if (marketingSwitch.checked == true) {
        console.log("marketing Notification on");
        const subscriptionStatus = {
            //업데이트할 항목만 입력
            marketing_notification_flag: true
        };
        adbrix.setSubscriptionStatus(subscriptionStatus).then(result => {
            if (result.is_success) {
                //성공
            }
        });
    } else {
        console.log("marketing Notification off");
        const subscriptionStatus = {
            //업데이트할 항목만 입력
            marketing_notification_flag: false
        };
        adbrix.setSubscriptionStatus(subscriptionStatus).then(result => {
            if (result.is_success) {
                //성공
            }
        });
    }
}

function appNotification() {
    var appSwich = document.getElementById("appSwitch");
    if (appSwich.checked == true) {
        console.log("app Notification on");
        const subscriptionStatus = {
            //업데이트할 항목만 입력
            marketing_notification_flag_for_push_channel: true
        };
        adbrix.setSubscriptionStatus(subscriptionStatus).then(result => {
            if (result.is_success) {
                //성공
            }
        });
    } else {
        console.log("app Notification off");
        const subscriptionStatus = {
            //업데이트할 항목만 입력
            marketing_notification_flag_for_push_channel: false
        };
        adbrix.setSubscriptionStatus(subscriptionStatus).then(result => {
            if (result.is_success) {
                //성공
            }
        });
    }
}

function smsNotification() {
    var smsSwich = document.getElementById("smsSwitch");
    if (smsSwich.checked == true) {
        console.log("sms Notification on");
        const subscriptionStatus = {
            //업데이트할 항목만 입력
            marketing_notification_flag_for_sms_channel: true
        };
        adbrix.setSubscriptionStatus(subscriptionStatus).then(result => {
            if (result.is_success) {
                //성공
            }
        });
    } else {
        console.log("sms Notification off");
        const subscriptionStatus = {
            //업데이트할 항목만 입력
            marketing_notification_flag_for_sms_channel: false
        };
        adbrix.setSubscriptionStatus(subscriptionStatus).then(result => {
            if (result.is_success) {
                //성공
            }
        });
    }
}

function kakaoNotification() {
    var kakaoSwitch = document.getElementById("kakaoSwitch");
    if (kakaoSwitch.checked == true) {
        console.log("kakao Notification on");
        const subscriptionStatus = {
            //업데이트할 항목만 입력
            marketing_notification_flag_for_kakao_channel: true
        };
        adbrix.setSubscriptionStatus(subscriptionStatus).then(result => {
            if (result.is_success) {
                //성공
            }
        });
    } else {
        console.log("kakao Notification off");
        const subscriptionStatus = {
            //업데이트할 항목만 입력
            marketing_notification_flag_for_kakao_channel: false
        };
        adbrix.setSubscriptionStatus(subscriptionStatus).then(result => {
            if (result.is_success) {
                //성공
            }
        });
    }
}

//야간 알림 function
function nightNotification() {
    var nightSwitch = document.getElementById("nightSwitch");
    if (nightSwitch.checked == true) {
        console.log("Night Notification on");
        const subscriptionStatus = {
            //업데이트할 항목만 입력
            marketing_notification_at_night_flag: true
        };
        adbrix.setSubscriptionStatus(subscriptionStatus).then(result => {
            if (result.is_success) {
                //성공
            }
        });
    } else {
        console.log("Night Notification off");
        const subscriptionStatus = {
            //업데이트할 항목만 입력
            marketing_notification_at_night_flag: false
        };
        adbrix.setSubscriptionStatus(subscriptionStatus).then(result => {
            if (result.is_success) {
                //성공
            }
        });
    }
}

function appNightNotification() {
    var appNightSwich = document.getElementById("appNightSwitch");
    if (appNightSwich.checked == true) {
        console.log("app Night Notification on");
        const subscriptionStatus = {
            //업데이트할 항목만 입력
            marketing_notification_at_night_flag_for_push_channel: true
        };
        adbrix.setSubscriptionStatus(subscriptionStatus).then(result => {
            if (result.is_success) {
                //성공
                console.log("app Night Notification on :: 성공");
            }
        });
    } else {
        console.log("app Night Notification off");
        const subscriptionStatus = {
            //업데이트할 항목만 입력
            marketing_notification_at_night_flag_for_push_channel: false
        };
        adbrix.setSubscriptionStatus(subscriptionStatus).then(result => {
            if (result.is_success) {
                //성공
                console.log("app Night Notification off :: 성공");
            }
        });
    }
}

function smsNightNotification() {
    var smsNightSwich = document.getElementById("smsNightSwitch");
    if (smsNightSwich.checked == true) {
        console.log("sms Night Notification on");
        const subscriptionStatus = {
            //업데이트할 항목만 입력
            marketing_notification_at_night_flag_for_sms_channel: true
        };
        adbrix.setSubscriptionStatus(subscriptionStatus).then(result => {
            if (result.is_success) {
                //성공
                console.log("sms Night Notification on :: 성공");
            }
        });
    } else {
        console.log("sms Night Notification off");
        const subscriptionStatus = {
            //업데이트할 항목만 입력
            marketing_notification_at_night_flag_for_sms_channel: false
        };
        adbrix.setSubscriptionStatus(subscriptionStatus).then(result => {
            if (result.is_success) {
                //성공
                console.log("sms Night Notification off :: 성공");
            }
        });
    }
}

function kakaoNightNotification() {
    var kakaoNightSwitch = document.getElementById("kakaoNightSwitch");
    if (kakaoNightSwitch.checked == true) {
        console.log("kakao Night Notification on");
        const subscriptionStatus = {
            //업데이트할 항목만 입력
            marketing_notification_at_night_flag_for_kakao_channel: true
        };
        adbrix.setSubscriptionStatus(subscriptionStatus).then(result => {
            if (result.is_success) {
                //성공
                console.log("kakao Night Notification on :: 성공");
            }
        });
    } else {
        console.log("kakao Night Notification off");
        const subscriptionStatus = {
            //업데이트할 항목만 입력
            marketing_notification_at_night_flag_for_kakao_channel: false
        };
        adbrix.setSubscriptionStatus(subscriptionStatus).then(result => {
            if (result.is_success) {
                //성공
                console.log("kakao Night Notification off :: 성공");
            }
        });
    }
}

function fetchInWebMessage(){
    adbrix.fetchInWebMessage().then(() => {

    });
}

function getAllInWebMessages(){
    const getAllInWebMessages = adbrix.getAllInWebMessages();
    getAllInWebMessages.then(result => {
        result.forEach(inWebMessage => {

        });
    });
}

function openInWebMessageByCampaignId(){
    var openInWebMessageinput = $('#openInWebMessage').val();
    console.log(openInWebMessageinput);
    adbrix.openInWebMessageByCampaignId(openInWebMessageinput);
}

// Method Name
const AdbrixMethodName = {
    login: "login",
    logout: "logout",
    signUp: "signUp",
    purchase: "purchase",
    viewHome: "viewHome"
}

// SignUp Channel
const AdbrixSignUpChannel = {
    AdBrixRmSignUpKakaoChannel: 1,
    AdBrixRmSignUpNaverChannel: 2,
    AdBrixRmSignUpLineChannel: 3,
    AdBrixRmSignUpGoogleChannel: 4,
    AdBrixRmSignUpFacebookChannel: 5,
    AdBrixRmSignUpTwitterChannel: 6,
    AdBrixRmSignUpWhatsAppChannel: 7,
    AdBrixRmSignUpQQChannel: 8,
    AdBrixRmSignUpWeChatChannel: 9,
    AdBrixRmSignUpUserIdChannel: 10,
    AdBrixRmSignUpETCChannel: 11,
    AdBrixRmSignUpSkTidChannel: 12,
    AdBrixRmSignUpAppleIdChannel: 13
};

// Payment Method
const AdbrixPaymentMethod = {
    CreditCard: 1,
    BankTransfer: 2,
    MobilePayment: 3,
    ETC: 4
}

// Gender
const AdbrixGenderType = {
    Male: 2,
    Female: 1,
    Unknown: 0
}

// Currency
const AdbrixCurrency = {
    KRW: 1,
    USD: 2,
    JPY: 3,
    EUR: 4,
    GBP: 5,
    CNY: 6,
    TWD: 7,
    HKD: 8,
    IDR: 9,
    INR: 10,
    RUB: 11,
    THB: 12,
    VND: 13,
    MYR: 14
}

// 접속한 기기가 안드로이드면 true를 반환
function isAndroidBridgeAvailable() {
    var result = false;
    if (window.adbrixBridge) {
        result = true;
    }
    if (!result) {
        console.log("No Android APIs found.");
    }
    return result;
}

// 접속
function isIosBridgeAvailable() {
    var result = false;
    if (window.webkit
        && window.webkit.messageHandlers
        && window.webkit.messageHandlers.adbrixBridge) {
        result = true;
    }
    if (!result) {
        console.log("No iOS APIs found.");
    }
    return result;
}

// Invite channel
const AdbrixInviteChannel = {
    AdBrixRmInviteKakaoChannel: 1,
    AdBrixRmInviteNaverChannel: 2,
    AdBrixRmInviteLineChannel: 3,
    AdBrixRmInviteGoogleChannel: 4,
    AdBrixRmInviteFacebookChannel: 5,
    AdBrixRmInviteTwitterChannel: 6,
    AdBrixRmInviteWhatsAppChannel: 7,
    AdBrixRmInviteQQChannel: 8,
    AdBrixRmInviteWeChatChannel: 9,
    AdBrixRmInviteETCChannel: 10
}