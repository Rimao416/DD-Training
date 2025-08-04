// components/WelcomeButton.tsx
export default function WelcomeButton({ user }) {
  return (
    <button style={{ padding: "8px 16px", fontSize: "16px" }}>
      Bienvenue, {user.name} 
    </button>
  );
}