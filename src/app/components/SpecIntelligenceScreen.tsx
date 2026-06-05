const SPEC_URL = 'https://black-grass-08bff5500.2.azurestaticapps.net/';

export function SpecIntelligenceScreen() {
  return (
    <iframe
      src={SPEC_URL}
      title="Spec Intelligence"
      style={{
        width: '100%',
        height: 'calc(100vh - 80px)',
        border: 'none',
        display: 'block',
      }}
    />
  );
}
