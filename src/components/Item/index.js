import React from 'react';
import { useSelector, useDispatch } from "react-redux";

const Item = () => {
  const list = useSelector(state => state.githubReducer);
  const dispatch = useDispatch();

  const renderHTML = (curSong) => {
    let html = ``;
    if (curSong.id !== undefined && curSong.id !== null) {
      html = (
        <>
          <td>
            <div id={ "music_" + curSong.id }>
              <table className='table-style'>
                <tr>
                  <td className="image-td"><a href={ `https://genius.com/${ curSong.infoId }` } target="_blank"><img src={curSong.img} width="175px" alt={curSong.title}></img></a></td>
                  <td>
                    <h1>{curSong.titleDisplay}</h1>
                    <p>{curSong.album}</p>
                    <iframe id={ "iframe_" + curSong.id } className="player" src={ `https://genius.com/songs/${ curSong.id }/apple_music_player` } hidden={ curSong.apple_music_id === null || curSong.apple_music_id === undefined }></iframe>
                  </td>
                  <td>
                    <button onClick={()=>addSong(curSong)} className="custom-button" hidden={!allowAdd}>Add</button>
                    <button onClick={()=>deleteSong(curSong)} className="custom-button" hidden={!allowDel}>Del</button>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </>
      );
      wait(1000).then(()=>{
        const iframe = document.getElementById("iframe_" + curSong.id);
        if (iframe !== undefined && iframe !== null) {
          iframe.style.background = getBackgroundCSSColor(curSong.random, true);
          iframe.style.color = getTextCSSColor(curSong.random);
        }
      });
    }
    return html;
  };

  return renderHTML(curSong);
}

export default Item;