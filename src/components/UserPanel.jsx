
// components/UserPanel.tsx
import WelcomeButton from "./WelcomeButton";

export default function UserPanel({ user }) {
  return (
    <div style={{ border: "2px solid green", padding: "10px" }}>
      <h3>User Panel {user.name} (UserPanel)</h3>
      <WelcomeButton user={user} />
    </div>
  );
}

