import React, { useEffect } from 'react';
import { setGithubList } from "../../actions";
import { useSelector, useDispatch } from "react-redux";

const List = () => {
    const listOfGithub = useSelector(state => state.githubReducer);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const corhort = document.getElementById("corhort").value.toLowerCase();
        if (corhort !== undefined && corhort !== null && corhort !== "") {
            let listOfStudent = new Promise((resolve, reject) => {
                try {
                    const url1 = `https://raw.githubusercontent.com/getfutureproof/fp_study_notes_hello_github/main/${corhort}/roster.json`;
                    fetch(url1).then((res1)=>res1.json()).then((data1)=>{
                        resolve(data1.students);
                    }).catch((err)=>{
                        reject(err);
                    });
                } catch(err) {
                    reject(err);
                }
            });
            listOfStudent.then((listOfStudent)=>{
                listOfStudent.map((curStudent, index)=>{
                    const url2 = `https://api.github.com/users/${curStudent.github}/repos`;
                    fetch(url2).then((res2)=>res2.json()).then((data2)=>{
                        listOfStudent[index]['repo'] = data2;
                    });
                });
                dispatch(setGithubList(listOfStudent));
            }).catch((err)=>{
                console.log(err);
            });
        }
    };

    useEffect(()=>{
        renderHTML(listOfGithub);
    }, [listOfGithub]);

    const renderHTML = (listOfGithub) => {
        let html = ``;
        html = `<table>`;
        listOfGithub.map((cur1, index1)=>{
            cur1.repo.map((cur2, index2)=>{
                html = html + `
                <tr>
                    <td><b>${cur1.name}</b></td>
                    <td><b>${cur1.github}</b></td>
                    <td><b><a href="${cur2.url}">${cur2.name}</a></b></td>
                </tr>`;
            });
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
                            <form onSubmit={handleSubmit}>
                                <input id="corhort" type="text" placeholder="corhort name"></input>
                                <button type="submit">Search</button>
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="github_info"></div>
                        </td>
                    </tr>
                </table>
            </div>
        </>
    );
};
//<List />
export default List;