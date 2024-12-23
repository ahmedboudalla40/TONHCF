class BinancePay {
    constructor(apiKey, secretKey, merchantId) {
        this.apiKey = apiKey;
        this.secretKey = secretKey;
        this.merchantId = merchantId;
        this.baseUrl = 'https://bpay.binanceapi.com';
        this.subscriptionAmount = 5; // 5 USDT subscription
    }

    // Create a payment order
    async createOrder(merchantTradeNo) {
        const timestamp = Date.now();
        const payload = {
            env: {
                terminalType: 'WEB'
            },
            merchantTradeNo: merchantTradeNo,
            orderAmount: this.subscriptionAmount,
            currency: 'USDT',
            goods: {
                goodsType: '01',
                goodsCategory: 'Subscription',
                referenceGoodsId: 'Monthly_Sub',
                goodsName: 'Monthly Subscription',
            },
            merchantId: this.merchantId,
            returnUrl: window.location.origin + '/payment-success.html',
            cancelUrl: window.location.origin + '/payment-cancel.html',
        };

        const signature = this.generateSignature(payload, timestamp);

        try {
            const response = await fetch(`${this.baseUrl}/binancepay/openapi/v2/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'BinancePay-Timestamp': timestamp,
                    'BinancePay-Nonce': this.generateNonce(),
                    'BinancePay-Certificate-SN': this.apiKey,
                    'BinancePay-Signature': signature
                },
                body: JSON.stringify(payload)
            });

            return await response.json();
        } catch (error) {
            console.error('Payment creation failed:', error);
            throw error;
        }
    }

    // Generate signature for Binance Pay API
    generateSignature(payload, timestamp) {
        const content = timestamp + '\n' + this.generateNonce() + '\n' + JSON.stringify(payload) + '\n';
        const hmac = CryptoJS.HmacSHA512(content, this.secretKey);
        return hmac.toString(CryptoJS.enc.Hex).toUpperCase();
    }

    // Generate nonce for API requests
    generateNonce() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}

// Initialize Binance Pay (Replace these with your actual API keys)
const binancePay = new BinancePay(
    'YOUR_API_KEY',
    'YOUR_SECRET_KEY',
    'YOUR_MERCHANT_ID'
);
