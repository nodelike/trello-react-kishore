import axios from "axios";

let api = "8d68d92e3e26b085f769a6cddeab08b0";
let token = "ATTAb6da62225aedc8f688d5ecf7e6bbe3a90281e76e7865d8e6c3a08147fa359c371100E31C";

export const getAllBoards = async () => {
    let boardsResponse = await axios.get(`https://api.trello.com/1/members/me/boards?fields=name,url&key=${api}&token=${token}`);
    return boardsResponse.data;
}

export const createBoard = async (boardName) => {
    let createdBoard = await axios.post(`https://api.trello.com/1/boards/?name=${boardName}&key=${api}&token=${token}`);
    return createdBoard.data;
}

export const getLists = async (boardId) => {
    let lists = await axios.get(`https://api.trello.com/1/boards/${boardId}/lists?key=${api}&token=${token}`);
    return lists.data;
}

export const getCards = async (listID) => {
    let cards = await axios.get(`https://api.trello.com/1/lists/${listID}/cards?key=${api}&token=${token}`);
    return cards.data;
}

export const createList = async (listName, boardID) => {
    let createdList = await axios.post(`https://api.trello.com/1/lists/?name=${listName}&idBoard=${boardID}&key=${api}&token=${token}`);
    return createdList.data;
}

export const deleteList = async (listID) => {
    let deletedList = await axios.put(`https://api.trello.com/1/lists/${listID}/closed?value=true&key=${api}&token=${token}`);
    return deletedList.data;
}

export const deleteCard = async (cardId) => {
    let deletedCard = await axios.delete(`https://api.trello.com/1/cards/${cardId}?key=${api}&token=${token}`);
    return deletedCard.data;
}

export const createCard = async (name, listID) => {
    let createdCard = await axios.post(`https://api.trello.com/1/cards?idList=${listID}&name=${name}&key=${api}&token=${token}`);
    return createdCard.data;
}

export const getChecklists = async (listID) => {
    let lists = await axios.get(`https://api.trello.com/1/cards/${listID}/checklists?key=${api}&token=${token}`);
    return lists.data;
}

export const getCheckitems = async (checklistId) => {
    let checkItems = await axios.get(`https://api.trello.com/1/checklists/${checklistId}/checkItems?key=${api}&token=${token}`);
    return checkItems.data;
}

export const createChecklist = async (name, cardId) => {
    let createdChecklist = await axios.post(`https://api.trello.com/1/checklists?idCard=${cardId}&name=${name}&key=${api}&token=${token}`)
    return createdChecklist.data;
}

export const createCheckitem = async (name, checklistId) => {
    let createdChecklist = await axios.post(`https://api.trello.com/1/checklists/${checklistId}/checkItems?name=${name}&key=${api}&token=${token}`)
    return createdChecklist.data;
}

export const deleteChecklist = async (checklistId) => {
    let deletedChecklist = await axios.delete(`https://api.trello.com/1/checklists/${checklistId}?key=${api}&token=${token}`)
    return deletedChecklist.data;
}

export const deleteCheckitem = async (checkitemId, checklistId) => {
    let deletedCheckitem = await axios.delete(`https://api.trello.com/1/checklists/${checklistId}/checkItems/${checkitemId}?key=${api}&token=${token}`)
    console.log(deletedCheckitem);
    return deletedCheckitem.data;
}

export const updateCheckitem = async (cardId, checkitemId, state) => {
    let stateQuery = "state=" + state;
    let updatedCheckitem = await axios.put(`https://api.trello.com/1/cards/${cardId}/checkItem/${checkitemId}?${stateQuery}&key=${api}&token=${token}`)
    console.log(updatedCheckitem.data);
    return updatedCheckitem.data;
}