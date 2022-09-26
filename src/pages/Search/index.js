import React, { useEffect } from 'react';
import { setList } from "../../actions";
import { useSelector, useDispatch } from "react-redux";

const Search = () => {
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
                        const sortStudents = data.students.sort(function(std1, std2) {if (std1.name[0] > std2.name[0]) {return 1} if (std1.name[0] < std2.name[0]) {return -1} return 0;})
                        resolve(sortStudents);
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
                                <label for="corhort"><h1>Corhort:</h1></label>
                                <select id="corhort" name="corhort">
                                    <option value="sholes">Sholes</option>
                                    <option value="gustafsson">Gustafsson</option>
                                    <option value="nakamoto">Nakamoto</option>
                                    <option value="shaw">Shaw</option>
                                    <option value="bhatia">Bhatia</option>
                                    <option value="rincon">Rincon</option>
                                    <option value="morgan">Morgan</option>
                                    <option value="al-jazari" selected>Al-jazari</option>
                                    <option value="auguste">Auguste</option>
                                    <option value="gebru">Gebru</option>
                                    <option value="mitnick">Mitnick</option>
                                    <option value="wilkes">Wilkes</option>
                                </select>
                                <button type="submit" class="btn btn-light">Search</button>
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
export default Search;