import { Routes, Route, Link, Outlet } from 'react-router-dom';
const Profile = () => {
    return (
        <div className={styles.profileLayout}>
            <aside className={styles.sidebar}>
                <h3>Мій акаунт</h3>
                <Link to="">Інформація</Link>
                <Link to="settings">Налаштування</Link>
            </aside>
            <div className={styles.content}>
                <Routes>
                    <Route index element={<ProfileOverview />} />
                    <Route path="settings" element={<ProfileSettings />} />
                </Routes>
            </div>
        </div>
    );
};
export default Profile;