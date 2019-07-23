import React, { Component } from 'react'

export default class GamePage extends Component {
    render() {
        return (

            <table className="game-table">
                <tr className="row">
                    <td id="pos-1">
                        <img className="x" src="/images/x.png" alt="x" />
                        {/* <img className="o" src="/images/o.png" alt="o" /> */}
                    </td>
                    <td id="pos-2">
                        <img className="x" src="/images/x.png" alt="x" />
                        {/* <img className="o" src="/images/o.png" alt="o" /> */}
                    </td>
                    <td id="pos-3">
                        <img className="x" src="/images/x.png" alt="x" />
                        {/* <img className="o" src="/images/o.png" alt="o" /> */}
                    </td>
                </tr>
                <tr className="row">
                    <td id="pos-4">
                        <img className="x" src="/images/x.png" alt="x" />
                        {/* <img className="o" src="/images/o.png" alt="o" /> */}
                    </td>
                    <td id="pos-5">
                        <img className="x" src="/images/x.png" alt="x" />
                        {/* <img className="o" src="/images/o.png" alt="o" /> */}
                    </td>
                    <td id="pos-6">
                        {/* <img className="x" src="/images/x.png" alt="x" /> */}
                        <img className="o" src="/images/o.png" alt="o" />
                    </td>

                </tr>
                <tr className="row">
                    <td id="pos-7">
                        {/* <img className="x" src="/images/x.png" alt="x" /> */}
                        <img className="o" src="/images/o.png" alt="o" />
                    </td>
                    <td id="pos-8">
                        <img className="x" src="/images/x.png" alt="x" />
                        {/* <img className="o" src="/images/o.png" alt="o" /> */}
                    </td>
                    <td id="pos-9">
                        <img className="x" src="/images/x.png" alt="x" />
                        {/* <img className="o" src="/images/o.png" alt="o" /> */}
                    </td>
                </tr>
            </table>
        )
    }
}
