import { observer } from "mobx-react";
import Header from "../components/Header.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../features/user/userSelector.js';
import { useEffect } from "react";
import { loadUsers } from "../features/user/userAction.js";


function Home() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <>
      <Header></Header>
      <div className="">
        <section>
          {users.map((user) =>
            <div>
              <p key={user.id}>{user.name} || {user.email}</p>
            </div>
          )}
        </section>
        {/* <section>
          <pre>
            {apiData.users
              ? apiData.users.map((user) => <div key={user.id}>{user.name}</div>)
              : "No user data available"}
          </pre>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={musicInput}
              onChange={(e) => setMusicInput(e.target.value)}
              placeholder="Search albums..."
            />
          </form>
          <p>{music.artist}</p>
        </section> */}
      </div>
    </>
  );
}

export default observer(Home);
