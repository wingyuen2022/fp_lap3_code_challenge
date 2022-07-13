import React, { useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { setRepos } from "../../actions";
import { useSelector, useDispatch } from "react-redux";

const Details = () => {
    const { github } = useParams();

    const repos = useSelector(state => state.reposReducer);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(()=>{
        let repos = new Promise((resolve, reject) => {
            try {
                const url = `https://api.github.com/users/${github}/repos`;
                fetch(url).then((res)=>res.json()).then((data)=>{
                    resolve(data);
                }).catch((err)=>{
                    reject(err);
                });
            } catch(err) {
                reject(err);
            }
        });
        repos.then((repos)=>{
            dispatch(setRepos(repos));
        }).catch((err)=>{
            console.log(err);
        });
    }, []);

    useEffect(()=>{
        renderHTML(repos);
    }, [repos]);

    const renderHTML = (repos) => {
        let html = ``;
        html = `<h1>${github} <b>(${repos.length})</b></h1><br />`;
        html = html + `<table>`;
        html = html + `<tr><td width="300px"><h1>Repo Name</h1></td><td width="700px"><h1>Url</h1></td><td><h1>Visibility</h1></td></tr>`;
        repos.map((cur)=>{
            html = html + `
            <tr key=${cur.id}>
                <td><h2>${cur.name}</h2></td>
                <td><a href="${cur.html_url}" target="_blank"><b>${cur.html_url}</b></a></td>
                <td><b>${cur.visibility}</b></td>
            </tr>`;
        });
        html = html + `</table>`;
        const infoDiv = document.getElementById("github_info");
        infoDiv.innerHTML = html;
    };

    return (
        <>
            <div className="align-center">
                <table>
                    <tr>
                        <td>
                            <div id="github_info"></div>
                        </td>
                    </tr>
                </table>
            </div>
            <br />
            <form>
                <button onClick={(e)=>{
                    e.preventDefault();
                    navigate(-1);
                }}>Back</button>
            </form>
        </>
    );
};
//<List />
export default Details;