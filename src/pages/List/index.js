import React, { useEffect } from 'react';
import { setList } from "../../actions";
import { useSelector, useDispatch } from "react-redux";

const List = () => {
    const listOfSearchResult = useSelector(state => state.listReducer);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const corhort = document.getElementById("corhort").value.toLowerCase();
        if (corhort !== undefined && corhort !== null && corhort !== "") {
            let listOfStudent = new Promise((resolve, reject) => {
                try {
                    const url = `https://raw.githubusercontent.com/getfutureproof/fp_study_notes_hello_github/main/${corhort}/roster.json`;
                    fetch(url).then((res)=>res.json()).then((data)=>{
                        resolve(data.students);
                    }).catch((err)=>{
                        reject(err);
                    });
                } catch(err) {
                    reject(err);
                }
            });
            listOfStudent.then((listOfStudent)=>{
                dispatch(setList(listOfStudent));                
            }).catch((err)=>{
                console.log(err);
            });
        }
    };

    useEffect(()=>{
        renderHTML(listOfSearchResult);
    }, [listOfSearchResult]);

    const renderHTML = (listOfSearchResult) => {
        let html = ``;
        html = `<table>`;
        html = html + `<tr><td width="300px"><h1>Name</h1></td><td width="300px"><h1>Github</h1></td></tr>`;
        listOfSearchResult.map((cur1, index1)=>{
            html = html + `
            <tr>
                <td width="300px"><a href="/details/${cur1.github}"><b>${cur1.name}</b></a></td>
                <td width="300px"><a href="/details/${cur1.github}"><b>${cur1.github}</b></a></td>
            </tr>`;
        });
        html = html + `</table>`;
        const infoDiv = document.getElementById("student_github");
        infoDiv.innerHTML = html;
    };

    return (
        <>
            <div className="align-center">
                <table>
                    <tr>
                        <td>
                            <form onSubmit={handleSubmit}>
                                <select id="corhort" name="corhort">
                                    <option value="al-jazari" default>Al-jazari</option>
                                    <option value="morgan">Morgan</option>
                                    <option value="rincon">Rincon</option>
                                    <option value="bhatia">Bhatia</option>
                                    <option value="wilkes">Wilkes</option>
                                    <option value="mitnick">Mitnick</option>
                                    <option value="gebru">Gebru</option>
                                    <option value="auguste">Auguste</option>
                                </select>
                                <button type="submit">Search</button>
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="student_github"></div>
                        </td>
                    </tr>
                </table>
            </div>
        </>
    );
};
//<List />
export default List;