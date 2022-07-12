import React, { useEffect } from 'react';
import Item from '../Item';
import { useSelector, useDispatch } from "react-redux";

const List = () => {
  const list = useSelector(state => state.githubReducer);
  const dispatch = useDispatch();

  const renderRows = () => {
    return list.map((cur) => (<tr key={cur.id}><MusicItem allowAdd={false} allowDel={true} curSong={cur} /></tr>));
  }

  useEffect(() => {
    renderRows();
  }, [list]);

  return (
    <>
      <table className='table-style'>
        { renderRows() }
      </table>
    </>
  );
}

export default List;