# Web Template - Developer Guide

คู่มือระบุตำแหน่งไฟล์สำหรับแก้ชื่อโปรเจกต์, title, เมนู, หน้า, ข้อมูล mockup และส่วนประกอบหลักของระบบ

## เริ่มต้นใช้งาน

```bash
npm install
npm run dev
```

คำสั่งตรวจสอบก่อนส่งงาน:

```bash
npm run lint
npm run build
```

## เปลี่ยนชื่อโปรเจกต์และ Branding

### ชื่อบน Browser Tab

แก้ `<title>` ที่:

```text
index.html
```

ตัวอย่าง:

```html
<title>ชื่อระบบใหม่</title>
```

### ชื่อและคำอธิบายที่ Logo

แก้ข้อความ `Web Template` และ `React dashboard` ที่:

```text
src/components/branding/Logo.tsx
```

ไฟล์นี้ถูกใช้ทั้งหน้า Login, Loading และ Header

### Icon ของ Logo

แก้ component `Zap` ใน:

```text
src/components/branding/Logo.tsx
```

Icon มาจากแพ็กเกจ `lucide-react`

### Favicon

เปลี่ยนไฟล์:

```text
public/favicon.svg
```

ถ้าเปลี่ยนชื่อไฟล์ ต้องแก้ `href` ใน `index.html` ด้วย

### ชื่อ Package

แก้ค่า `name` ใน:

```text
package.json
```

จากนั้นรัน `npm install` เพื่ออัปเดต lock file

## หน้าและ Route

ระบบใช้ Hash Routing เช่น:

```text
#/overview
#/orders
#/products
```

### รายการ Route ทั้งหมด

แก้ type `PageId` ที่:

```text
src/types/navigation.ts
```

### รายละเอียดชื่อและคำอธิบาย Route

แก้ object `pages` ที่:

```text
src/data/navigation.ts
```

ไฟล์นี้ใช้ตรวจสอบว่า URL เป็น route ที่ถูกต้องหรือไม่

### เชื่อม Route กับ Page Component

เพิ่ม import และเงื่อนไขแสดงหน้าใน:

```text
src/App.tsx
```

ตัวอย่าง:

```tsx
import { ReportsPage } from './components/pages/ReportsPage'

{currentRoute === 'reports' && <ReportsPage />}
```

### สร้างหน้าใหม่

สร้างไฟล์ใน:

```text
src/components/pages/
```

ตัวอย่าง:

```text
src/components/pages/ReportsPage.tsx
```

## เพิ่ม Menu

แก้รายการ Sidebar ที่:

```text
src/components/navigation/SidebarContent.tsx
```

### Menu ปกติ

ใช้ `NavItem`:

```tsx
<NavItem
  icon={FileText}
  label="Reports"
  page="reports"
  active={currentPage === 'reports'}
  collapsed={collapsed}
  onClick={() => navigate('reports')}
/>
```

ต้อง import icon จาก `lucide-react` และเพิ่ม route ก่อน

### Menu ที่มี Submenu

ใช้ `NavGroup` และเพิ่มรายการใน `items`:

```tsx
<NavGroup
  icon={ShoppingBag}
  label="Commerce"
  collapsed={collapsed}
  open={submenus.commerce}
  activePage={currentPage}
  onToggle={() => onSubmenuToggle('commerce')}
  onNavigate={navigate}
  items={[
    { id: 'orders', label: 'Orders' },
    { id: 'products', label: 'Products' },
  ]}
/>
```

ค่าเริ่มต้นเปิดหรือปิด submenu อยู่ที่:

```text
src/layouts/AppLayout.tsx
```

ตัวอย่าง:

```tsx
{ commerce: true }
```

### Design ของ Menu

```text
src/components/navigation/NavItem.tsx
src/components/navigation/NavGroup.tsx
src/components/navigation/Sidebar.tsx
src/components/navigation/SidebarContent.tsx
```

- `NavItem.tsx`: menu ปกติ
- `NavGroup.tsx`: menu ที่มี submenu และ flyout ตอน collapse
- `Sidebar.tsx`: ขนาด sidebar, mobile sidebar และปุ่ม collapse
- `SidebarContent.tsx`: รายการและลำดับ menu

## ขั้นตอนเพิ่มหน้าใหม่แบบครบ

ตัวอย่างเพิ่มหน้า `Reports`:

1. เพิ่ม `'reports'` ใน `PageId` ที่ `src/types/navigation.ts`
2. เพิ่มข้อมูล `reports` ใน `src/data/navigation.ts`
3. สร้าง `src/components/pages/ReportsPage.tsx`
4. Import และ render หน้าใน `src/App.tsx`
5. เพิ่ม `NavItem` หรือ submenu ใน `src/components/navigation/SidebarContent.tsx`
6. รัน `npm run lint` และ `npm run build`

## หน้า Login

ไฟล์หลัก:

```text
src/components/pages/LoginPage.tsx
```

แก้ได้ที่ไฟล์นี้:

- Username และ Password demo
- Validation
- ข้อความ Welcome
- Form และปุ่ม Login
- Demo account

ค่าบัญชี demo:

```tsx
const DEMO_USERNAME = 'admin'
const DEMO_PASSWORD = 'password123'
```

สถานะ Login เก็บใน Local Storage ผ่าน:

```text
src/hooks/useAuth.ts
```

พื้นหลังและ animation ของหน้า Login:

```text
src/index.css
```

## Header และ Profile Menu

แก้ที่:

```text
src/layouts/Header.tsx
```

ภายในไฟล์นี้มี:

- ชื่อผู้ใช้
- ตำแหน่ง
- Initials เช่น `AK`
- สถานะออนไลน์
- แผนก
- Email
- ปุ่ม View profile
- ปุ่ม Settings
- ปุ่ม Log out

ปัจจุบันข้อมูล Profile เป็น mockup และเขียนไว้ใน component โดยตรง

## Dashboard

หน้า Overview:

```text
src/components/pages/OverviewPage.tsx
src/components/dashboard/Dashboard.tsx
```

ข้อมูลกราฟและ Transaction mockup:

```text
src/data/dashboard.ts
```

Component ภายใน Dashboard:

```text
src/components/dashboard/MetricCard.tsx
src/components/dashboard/RevenueChart.tsx
src/components/dashboard/TrafficChart.tsx
src/components/dashboard/TransactionsTable.tsx
```

## Table

Table กลางที่มี Search, Filter, Sort และ Pagination:

```text
src/components/table/FeatureTable.tsx
```

หน้าที่ใช้งาน:

```text
src/components/pages/OrdersPage.tsx
src/components/pages/ProductsPage.tsx
src/components/pages/CustomersPage.tsx
```

### แก้ข้อมูล Orders

แก้ array `orders` ที่:

```text
src/components/pages/OrdersPage.tsx
```

### แก้ข้อมูล Products

แก้ prop `rows` ที่:

```text
src/components/pages/ProductsPage.tsx
```

### แก้ข้อมูล Customers

แก้ prop `rows` ที่:

```text
src/components/pages/CustomersPage.tsx
```

### หน้า List แบบใช้ซ้ำ

Products และ Customers ใช้ layout กลาง:

```text
src/components/pages/CommerceListPage.tsx
```

### เพิ่ม Filter

กำหนด index ของ column:

```tsx
filterColumn={1}
filterLabel="All categories"
```

index เริ่มจาก `0`

ตัวอย่าง columns:

```tsx
columns={['Product', 'Category', 'Price', 'Stock']}
```

ดังนั้น `filterColumn={1}` คือ filter จาก `Category`

## Loading

หน้า Loading ตอนเปิดระบบ:

```text
src/components/pages/LoadingPage.tsx
```

Loading overlay ตอน Login:

```text
src/components/pages/LoadingOverlay.tsx
```

ระยะเวลา Loading แรก:

```text
src/App.tsx
```

ปัจจุบันตั้งไว้ `600` milliseconds

ระยะเวลา Loading ตอน Login:

```text
src/components/pages/LoginPage.tsx
```

ปัจจุบันตั้งไว้ `700` milliseconds

## Theme และ CSS

ไฟล์ CSS หลัก:

```text
src/index.css
```

โปรเจกต์ใช้ Tailwind CSS ผ่าน className ในแต่ละ component

สีหลักที่ใช้:

- Blue: action และ active state
- Slate: background และ text
- Emerald: success
- Amber: pending
- Rose: error และ logout

## Layout

Layout หลัก:

```text
src/layouts/AppLayout.tsx
```

ไฟล์นี้ควบคุม:

- Sidebar collapsed state
- Submenu state
- Mobile menu state
- ระยะ padding ของ content ตามขนาด Sidebar

Header:

```text
src/layouts/Header.tsx
```

Sidebar:

```text
src/components/navigation/Sidebar.tsx
```

## Local Storage Keys

สถานะต่าง ๆ ถูกบันทึกใน browser:

```text
web-template-authenticated
lumina-sidebar-collapsed
lumina-sidebar-submenus
```

ตำแหน่งที่เกี่ยวข้อง:

```text
src/hooks/useAuth.ts
src/hooks/usePersistentState.ts
src/layouts/AppLayout.tsx
```

ถ้าทดสอบแล้วค่าเดิมค้าง สามารถลบ keys เหล่านี้จาก Browser DevTools > Application > Local Storage

## โครงสร้างไฟล์โดยย่อ

```text
src/
  components/
    branding/       Logo
    dashboard/      Dashboard widgets และ charts
    navigation/     Sidebar และ menu
    pages/          Page components
    table/          Reusable table
  data/             Mock data และ navigation definitions
  hooks/            Auth, routing และ persistent state
  layouts/          Header และ application layout
  types/            TypeScript types
  App.tsx           Route rendering และ auth flow
  index.css         Global CSS และ login background
  main.tsx          React entry point
```

## Checklist ก่อนส่งงาน

1. ตรวจว่า route ใหม่อยู่ใน `PageId`
2. ตรวจว่า route ใหม่อยู่ใน `pages`
3. ตรวจว่า `App.tsx` render component
4. ตรวจว่า Sidebar มี menu
5. ทดสอบทั้ง sidebar ปกติและ collapsed
6. ทดสอบ mobile menu
7. รัน `npm run lint`
8. รัน `npm run build`
