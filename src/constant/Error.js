const ErrorMessage = {
  LOGIN_FAILED:
    'รหัสนักศึกษา หรือ รหัสผ่านไม่ถูกต้อง \nโปรดตรวจสอบข้อมูลแล้วลองใหม่อีกครั้ง.',
  APP_VERSION_MISMATCHED: `คุณกำลังใช้งานบนแอพลิเคชั่นเวอร์ชั่นเก่าอยู่ ซึ่งอาจทำให้ไม่สามารถใช้งาน API ได้อย่างสมบูรณ์. \nกรุณาอัพเดทแอพลิเคชั่นให้เป็นเวอร์ชั่นล่าสุดครับ .`,
  APP_ROOT_DETECTED: `ระบบไม่อนุญาตให้ใช้งานบนอุปกรณ์ที่มีการดัดแปลง (Jailbreak / Root) เพื่อความปลอดภัยของท่าน กรุณาใช้งานบนอุปกรณ์ที่ไม่ผ่านการดัดแปลง. หากท่านไม่ได้มีการดัดแปลงอุปกรณ์ โปรดตรวจสอบว่าท่านได้ใช้งานบน Android Version 7.0 หรือสูงกว่า`,
  APP_RESTRICT_MAJOR: `สาขาของคุณ  ไม่ได้รับสิทธิ์ให้ใช้งานแอพลิเคชั่นนี้.`,
  APP_MAINTENANCE: 'กำลังปิดปรับปรุง Server',
  APP_RESTRICT_USER: 'ผู้ใช้นี้ ไม่ได้รับอนุญาตให้ใช้งานแอพลิเคชั่นนี้',
  APP_RESTRICT_STUDENTID:
    'รหัสนักศึกษานี้ ไม่ได้รับอนุญาตให้ใช้งานแอพลิเคชั่นนี้',
};

export {ErrorMessage};
