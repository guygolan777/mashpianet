# חיבור אינסטגרם רשמי (Instagram Graph API)

המטרה: יוצר מחבר את חשבון האינסטגרם שלו, ונתוני הביצועים והקהל נשמרים כמאומתים בטבלה `creator_insights` (`source='meta'`, `verified=true`).

## מה כבר קיים באתר
- טבלה `creator_insights` עם הרשאות: יוצר יכול לכתוב רק נתונים ידניים, לא מאומתים. שדות `audience`, `verified` ו-`source` נכתבים רק משרת (service role).
- לשונית "נתוני קהל" בפרופיל, וקטע "נתוני ביצועים" ב"הפרופיל שלי".

## מה צריך מכם
1. חשבון מפתחים ב-developers.facebook.com, ואפליקציה מסוג Business.
2. הוספת המוצר **Instagram API with Facebook Login** (או Instagram Login).
3. הרשאות לבקשה ב-App Review: `instagram_basic`, `instagram_manage_insights`, `pages_show_list`, `pages_read_engagement`.
4. דפי מדיניות פרטיות ותנאי שימוש ציבוריים בכתובת האתר, וסרטון הדגמה של התהליך.
5. כתובת Redirect של OAuth, למשל `https://mashpianim.co.il/#/connect-ig` (בפועל תהיה פונקציית שרת).

## מה יצטרך להיבנות
- Edge Function ב-Supabase שמקבלת `code` מ-Meta, מחליפה אותו ב-access token ארוך טווח, ושומרת אותו בטבלה פרטית (לא קריאה ללקוח).
- Edge Function מתוזמנת (פעם ביום) שקוראת ל:
  - `GET /{ig-user-id}?fields=followers_count,media_count`
  - `GET /{ig-user-id}/insights?metric=reach,impressions...` ו-`/media` לחישוב לייקים ותגובות ממוצעים
  - `GET /{ig-user-id}/insights?metric=follower_demographics&period=lifetime&breakdown=country|age|gender`
  - ומעדכנת את `creator_insights` עם `source='meta'`, `verified=true`.
- כפתור "חברו אינסטגרם" בפרופיל (כרגע מושבת) שפותח את מסך ההתחברות של Meta.

## מגבלות ידועות
- חשבון חייב להיות Business או Creator, ומחובר לדף פייסבוק.
- נתוני קהל (מדינה, גיל, מגדר) זמינים רק מ-100 עוקבים.
- יוצר שמנתק הרשאה: צריך לסמן את הנתונים כלא מאומתים או למחוק.
