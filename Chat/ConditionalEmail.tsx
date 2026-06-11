import {
    Body,
    Container,
    Head,
    Hr,
    Html,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";

interface OrderItem {
  id: number;
  name: string;
  price: number;
}

interface MangoEmailProps {
  username: string;
  userRole: "USER" | "ADMIN" | "PARTNER";
  isPremium: boolean;
  orders?: OrderItem[]; // JSONB 배열 데이터를 받을 프롭스 추가
}

export const ConditionalEmail = ({
  username,
  userRole,
  isPremium,
  orders = [],
}: MangoEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white p-8 my-10 mx-auto rounded-lg shadow-md max-w-xl">
            <Text className="text-xl font-bold">안녕하세요, {username}님!</Text>
            
            {/* 1. 조건부 렌더링: 프리미엄 유저에게만 보이는 섹션 */}
            {isPremium && (
              <Section className="bg-orange-50 p-4 border border-orange-200 rounded-md mt-4">
                <Text className="text-orange-700 m-0 font-bold">✨ 프리미엄 멤버십 혜택 적용 중</Text>
                <Text className="text-orange-600 text-sm m-0">망고 트래블 예약 시 5% 추가 적립을 받으실 수 있습니다.</Text>
              </Section>
            )}

            {/* 2. 루프(map)를 사용한 리스트 렌더링 */}
            <Section className="mt-6">
              <Text className="font-bold border-b border-gray-200 pb-2">최근 주문 내역</Text>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order.id} className="flex justify-between py-2 border-b border-gray-50 text-sm">
                    <Text className="m-0">{order.name}</Text>
                    <Text className="m-0 font-mono text-orange-600">
                      {order.price.toFixed(2)} π
                    </Text>
                  </div>
                ))
              ) : (
                <Text className="text-gray-500 text-sm italic py-4 text-center">
                  최근 주문 내역이 없습니다.
                </Text>
              )}
            </Section>

            <Text className="text-gray-600 mt-4">새로운 소식을 확인해 보세요.</Text>
            <Hr className="border-gray-200 my-6" />

            {/* 3. 조건부 렌더링: 관리자(ADMIN)에게만 보이는 제어 링크 */}
            {userRole === "ADMIN" && (
              <Text className="text-xs text-gray-400">
                본 이메일은 시스템 관리자 전용 정보가 포함되어 있습니다.
              </Text>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConditionalEmail;