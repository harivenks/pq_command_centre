import { ThemeColors } from './theme-config';
import { Sk, SkCard, SkCardHead } from './Skeleton';

interface Props { c: ThemeColors; }

export function ProcurementSkeleton({ c }: Props) {
  return (
    <div>
      {/* Filter bar */}
      <div style={{ display:'flex', gap:8, marginBottom:14, paddingBottom:12, borderBottom:`1px solid ${c.border}` }}>
        {[88,110,96,70,104,80].map((w,i)=>(
          <Sk key={i} c={c} w={w} h={30} r={4}/>
        ))}
      </div>

      {/* Main 2-col */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 330px', gap:14, marginBottom:14 }}>
        {/* Map */}
        <SkCard c={c}>
          <SkCardHead c={c}>
            <Sk c={c} w={220} h={13} r={3} style={{ marginBottom:6 }}/>
            <Sk c={c} w={300} h={10} r={3}/>
          </SkCardHead>
          <Sk c={c} w="100%" h={350} r={0}/>
        </SkCard>

        {/* Right charts */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <SkCard c={c}>
            <SkCardHead c={c}>
              <Sk c={c} w={160} h={12} r={3} style={{ marginBottom:5 }}/>
              <Sk c={c} w={100} h={9} r={3}/>
            </SkCardHead>
            <div style={{ padding:'10px 12px', display:'flex', flexDirection:'column', gap:9 }}>
              {[90,75,55,40].map((w,i)=>(
                <div key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <Sk c={c} w={40} h={10} r={2}/>
                  <Sk c={c} w={`${w}%`} h={22} r={2}/>
                </div>
              ))}
            </div>
          </SkCard>
          <SkCard c={c}>
            <SkCardHead c={c}>
              <Sk c={c} w={180} h={12} r={3} style={{ marginBottom:5 }}/>
              <Sk c={c} w={120} h={9} r={3}/>
            </SkCardHead>
            <div style={{ padding:'10px 12px', display:'flex', alignItems:'flex-end', gap:10, height:170 }}>
              {[80,70,52,62].map((h,i)=>(
                <Sk key={i} c={c} w="25%" h={`${h}%` as any} r={2}/>
              ))}
            </div>
          </SkCard>
        </div>
      </div>

      {/* Bottom panel */}
      <SkCard c={c}>
        <SkCardHead c={c}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <Sk c={c} w={200} h={13} r={3} style={{ marginBottom:6 }}/>
              <Sk c={c} w={150} h={9} r={3}/>
            </div>
            <Sk c={c} w={110} h={34} r={5}/>
          </div>
        </SkCardHead>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 280px' }}>
          <div style={{ padding:'10px 12px', borderRight:`1px solid ${c.border}` }}>
            <div style={{ display:'flex', alignItems:'flex-end', gap:10, height:175 }}>
              {[70,60,46,38,33,29].map((h,i)=>(
                <Sk key={i} c={c} w="16%" h={`${h}%` as any} r={2}/>
              ))}
            </div>
          </div>
          <div style={{ padding:'24px 20px', display:'flex', flexDirection:'column', gap:12 }}>
            <Sk c={c} w={44} h={44} r={8} style={{ alignSelf:'center' }}/>
            <Sk c={c} w="80%" h={13} r={3} style={{ alignSelf:'center' }}/>
            <Sk c={c} w="65%" h={10} r={3} style={{ alignSelf:'center' }}/>
            {[1,2,3].map(i=><Sk key={i} c={c} w="100%" h={28} r={4}/>)}
          </div>
        </div>
      </SkCard>
    </div>
  );
}
