export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 space-y-6">
      <h1 className="text-2xl font-black tracking-wide">MANGO ADMIN DASHBOARD</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard title="총 사용자" value="12,430" />
        <DashboardCard title="오늘 거래" value="₩18.4M" />
        <DashboardCard title="파트너 수" value="312" />
        <DashboardCard title="보안 상태" value="✔ 정상" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Section title="최근 가입 사용자" />
        <Section title="정산 대기 파트너" />
      </div>
    </div>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <p className="text-xs text-gray-400">{title}</p>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  );
}

function Section({ title }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h2 className="font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-400">데이터 로딩 예정</p>
    </div>
  );
}