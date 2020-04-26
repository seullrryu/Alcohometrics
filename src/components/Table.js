import React from 'react'; 
import "../css/master.scss";

export default function DataTable(props) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Beer (Can)</th>
                    <th>Soju (Shots)</th>
                    <th>Mixed (Glass)</th>
                    <th>Vodka (Shots)</th>
                    <th>Drunk</th>
                    <th>Alcohol (Grams)</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map(row => (
                        <tr>
                            <td>{row.date.substring(0,10)}</td>
                            <td>{row.drinks.beer}</td>
                            <td>{row.drinks.soju}</td>
                            <td>{row.drinks.mixed}</td>
                            <td>{row.drinks.vodka}</td>
                            {row.drunk ? (<td>Yes</td>) : (<td>No</td>)}
                            <td>{Math.round(row.alcohol * 100)/100}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}