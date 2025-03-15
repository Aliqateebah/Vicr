// الحصول على العناصر
const sendButton = document.getElementById('sendButton');
const messageInput = document.getElementById('messageInput');
const chatBox = document.getElementById('chatBox');
const statusSelect = document.getElementById('statusSelect');
const emojiSelect = document.getElementById('emojiSelect');
const notification = document.getElementById('notification');

// مصفوفة لتخزين الرسائل
let messages = [];

// دالة لعرض الرسائل في صندوق الدردشة
function displayMessages() {
    chatBox.innerHTML = ''; // مسح المحتوى القديم
    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(message.type); // إضافة نوع الرسالة (مرسلة أو مستقبلة)
        messageDiv.innerText = message.text;
        chatBox.appendChild(messageDiv);
    });
    chatBox.scrollTop = chatBox.scrollHeight; // التمرير لأسفل لتظهر الرسائل الجديدة
}

// دالة لإرسال الرسالة
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === '') return; // عدم إرسال رسائل فارغة

    // إضافة الرسالة إلى المصفوفة
    messages.push({
        text: messageText,
        type: 'sent'
    });

    // مسح حقل الإدخال
    messageInput.value = '';

    // عرض الرسائل المحدثة
    displayMessages();

    // إظهار إشعار
    notification.innerText = 'تم إرسال رسالة!';
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);

    // محاكاة رسالة من المستلم
    setTimeout(() => {
        const responseMessage = 'هذه رسالة تلقائية من المستلم.';
        messages.push({
            text: responseMessage,
            type: 'received'
        });
        displayMessages();
    }, 2000);
}

// دالة لتغيير حالة الاتصال
function changeStatus() {
    const status = statusSelect.value;
    console.log(`حالة الاتصال: ${status}`);
}

// دالة لإضافة الرمز التعبيري إلى الرسالة
function addEmoji() {
    const emoji = emojiSelect.value;
    messageInput.value += emoji;
}

// إضافة أحداث إلى الأزرار والقوائم
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
});
statusSelect.addEventListener('change', changeStatus);
emojiSelect.addEventListener('change', addEmoji);

// عرض الرسائل الأولية
displayMessages();
