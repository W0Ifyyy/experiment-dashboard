export default function ProfilePageId({ params }: any) {
  return (
    <div>
      <h1>Profile</h1>
      <p>
        Profile page:
        <span>{params.id}</span>
      </p>
    </div>
  );
}
