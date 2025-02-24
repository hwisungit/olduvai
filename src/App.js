import React, { useState } from 'react';
import './App.css';

const menuData = [
  // 에스프레소 음료
  { name: '아메리카노', category: '에스프레소', espresso: '50g', syrup: '-', water: '240g', total: '290g', less_sweet: '-', more_sweet: '-' },
  { name: '헤이즐넛아메리카노', category: '에스프레소', espresso: '50g', syrup: '2펌프', water: '220g', total: '290g', less_sweet: '1펌프', more_sweet: '3펌프' },
  { name: '에스프레소 HOT', category: '에스프레소', espresso: '50g', syrup: '설탕스틱,티스푼', water: '-', total: '-', less_sweet: '-', more_sweet: '-' },

  // 라떼(우유) 음료
  { name: '카페라떼', category: '라떼', espresso: '50g', syrup: '-', milk: '240g', total: '290g', less_sweet: '-', more_sweet: '-' },
  { name: '바닐라라떼', category: '라떼', espresso: '50g', syrup: '3펌프', milk: '210g', total: '290g', less_sweet: '2펌프', more_sweet: '4펌프' },
  { name: '헤이즐넛라떼', category: '라떼', espresso: '50g', syrup: '3펌프', milk: '210g', total: '290g', less_sweet: '2펌프', more_sweet: '4펌프' },
  { name: '돌체라떼', category: '라떼', espresso: '50g', syrup: '45g(연유)', milk: '200g', total: '290g', less_sweet: '30g', more_sweet: '60g' },
  { name: '카푸치노 HOT', category: '라떼', espresso: '50g', syrup: '시나몬 파우더', milk: '150g+50g(거품)', total: '250g', less_sweet: '-', more_sweet: '-' },
  { name: '플랫화이트 HOT', category: '라떼', espresso: '50g', syrup: '-', milk: '150g', total: '200g', less_sweet: '-', more_sweet: '-' },
  { name: '우유', category: '라떼', espresso: '-', syrup: '-', milk: '300g', total: '300g', less_sweet: '-', more_sweet: '-' },

  // 초코 음료
  { name: '초코라떼', category: '초코', syrup: '45g', milk: '245g', total: '290g', less_sweet: '30g', more_sweet: '60g' },
  { name: '화이트초코라떼', category: '초코', syrup: '45g', milk: '245g', total: '290g', less_sweet: '30g', more_sweet: '60g' },
  { name: '카페모카', category: '초코', espresso: '50g', syrup: '45g', milk: '200g', total: '290g', less_sweet: '30g', more_sweet: '60g' },
  { name: '화이트모카', category: '초코', espresso: '50g', syrup: '45g', milk: '200g', total: '290g', less_sweet: '30g', more_sweet: '60g' },

  // 과일 음료
  { name: '딸기라떼', category: '과일', fruit_syrup: '80g', syrup: '10g(연유)', liquid: '200g(우유)', total: '290g', less_sweet: '60g', more_sweet: '100g' },
  { name: '딸기에이드', category: '과일', fruit_syrup: '80g', syrup: '1펌프(설탕)', liquid: '200g(탄산수)', total: '290g', less_sweet: '60g', more_sweet: '100g' },
  { name: '패션망고에이드', category: '과일', fruit_syrup: '75g', syrup: '-', liquid: '215g(탄산수)', total: '290g', less_sweet: '50g', more_sweet: '100g' },
  { name: '자몽에이드', category: '과일', fruit_syrup: '75g', syrup: '-', liquid: '215g(탄산수)', total: '290g', less_sweet: '50g', more_sweet: '100g' },
  { name: '자몽차', category: '과일', fruit_syrup: '75g', syrup: '-', liquid: '215g(물)', total: '290g', less_sweet: '50g', more_sweet: '100g' },
  { name: '레몬에이드', category: '과일', fruit_syrup: '60g+레몬2~3개', syrup: '-', liquid: '215g(탄산수)', total: '290g', less_sweet: '40g', more_sweet: '80g' },
  { name: '레몬차', category: '과일', fruit_syrup: '60g+레몬2~3개', syrup: '-', liquid: '215g(물)', total: '290g', less_sweet: '40g', more_sweet: '80g' },

  // 차(Tea) 음료
  { name: '아쌈밀크티', category: '차', base: '75g', liquid: '215g(우유)', total: '290g', less_sweet: '50g', more_sweet: '100g' },
  { name: '말차라떼', category: '차', base: '60g', syrup: '1펌프(설탕시럽)', liquid: '215g(우유)', total: '290g', less_sweet: '40g', more_sweet: '80g' },
  { name: '타바론티 6종', category: '차', base: '티백 1ea', liquid: '290g(물)', total: '290g', less_sweet: '-', more_sweet: '-' },

  // 고구마, 마롱(밤)
  { name: '고구마라떼', category: '고구마/마롱', paste: '90g', milk: '200g', total: '290g', less_sweet: '60g', more_sweet: '120g' },
  { name: '마롱라떼', category: '고구마/마롱', paste: '60g', milk: '200g', total: '260g', less_sweet: '40g', more_sweet: '80g' },
  { name: '마롱슈가라떼', category: '고구마/마롱', espresso: '25g', paste: '50g', syrup: '1펌프(설탕시럽)', milk: '200g', total: '260g', less_sweet: '-', more_sweet: '-' },

  // 콜드브루
  { name: '콜드브루', category: '콜드브루', cold_brew: '90g', liquid: '200g(물)', total: '290g', less_sweet: '-', more_sweet: '-', light: '45g', strong: '135g' },
  { name: '콜드브루라떼', category: '콜드브루', cold_brew: '90g', liquid: '200g(우유)', total: '290g', less_sweet: '-', more_sweet: '-', light: '45g', strong: '135g' },
  { name: '콜드브루바닐라라떼', category: '콜드브루', syrup: '3펌프(바닐라)', cold_brew: '90g', liquid: '160g(우유)', total: '290g', less_sweet: '2펌프(바닐라)', more_sweet: '4펌프(바닐라)', light: '45g', strong: '135g' },

  // 기타
  { name: '아이스티', category: '기타', total: '290g', less_sweet: '-', more_sweet: '-' },
  { name: '아이스티(덜달게)', category: '기타', water: '250(아이스티)+40g(물)', total: '290g', less_sweet: '-', more_sweet: '-' },
  { name: '아이스티샷추가', category: '기타', water: '250', espresso: '25g', syrup: '1펌프(설탕)', total: '290g', less_sweet: '-', more_sweet: '-' },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMenu = menuData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <header>
        <h1>올두바이 임시 레시피</h1>
        <input
          type="text"
          placeholder="음료 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </header>
      <div className="menu-container">
        {filteredMenu.length > 0 ? (
          filteredMenu.map((item, index) => (
            <div className="menu-card" key={index}>
              <h2>{item.name}</h2>
              <p><strong>카테고리:</strong> {item.category}</p>
              {item.espresso && item.espresso !== '-' && <p><strong>에스프레소:</strong> {item.espresso}</p>}
              {item.syrup && item.syrup !== '-' && <p><strong>시럽:</strong> {item.syrup}</p>}
              {item.water && item.water !== '-' && <p><strong>물:</strong> {item.water}</p>}
              {item.milk && item.milk !== '-' && <p><strong>우유:</strong> {item.milk}</p>}
              {item.liquid && item.liquid !== '-' && <p><strong>기타(물/탄산수):</strong> {item.liquid}</p>}
              {item.fruit_syrup && item.fruit_syrup !== '-' && <p><strong>과일청:</strong> {item.fruit_syrup}</p>}
              {item.paste && item.paste !== '-' && <p><strong>페이스트:</strong> {item.paste}</p>}
              {item.base && item.base !== '-' && <p><strong>베이스:</strong> {item.base}</p>}
              {item.cold_brew && item.cold_brew !== '-' && <p><strong>콜드브루 원액:</strong> {item.cold_brew}</p>}
              {item.total && item.total !== '-' && <p><strong className='total-option'>총량:</strong> {item.total}</p>}
              {item.less_sweet && item.less_sweet !== '-' && <p><strong className="sweet-option">덜 달게:</strong> {item.less_sweet}</p>}
              {item.more_sweet && item.more_sweet !== '-' && <p><strong className="sweet-option">더 달게:</strong> {item.more_sweet}</p>}
              {item.light && item.light !== '-' && <p><strong className="sweet-option">연하게:</strong> {item.light}</p>}
              {item.strong && item.strong !== '-' && <p><strong className="sweet-option">진하게:</strong> {item.strong}</p>}
            </div>
          ))
        ) : (
          <p className="no-results">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default App;