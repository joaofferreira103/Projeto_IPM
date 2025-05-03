<template>
    <div class="overlay">
      <div class="logout-modal">
        <img class="logout-icon" :src="require('@/assets/images/icon_person.png')" alt="icon person" />
        <div class="logout-text">
          Tem a certeza que pretende<br>terminar a sessão?
        </div>
        <button class="logout-btn" @click="$emit('confirm')">Terminar sessão</button>
        <button class="cancel-btn" @click="$emit('cancel')">Cancelar</button>
      </div>
    </div>
  </template>
  
  <style scoped>
  .overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(44, 30, 60, 0.45);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logout-modal {
    background: #d4b1df;
    border-radius: 28px;
    padding: 38px 32px 32px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 340px;
    max-width: 90vw;
    box-shadow: 0 4px 24px rgba(44,30,60,0.15);
  }
  .logout-icon {
    width: 90px;
    height: 90px;
    margin-bottom: 18px;
  }
  .logout-text {
    color: #3a2658;
    font-family: "Istok Web-Regular", Helvetica;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 24px;
  }
  .logout-btn {
    background: #3a2658;
    color: #fff;
    font-family: "Istok Web-Regular", Helvetica;
    font-size: 1.25rem;
    border: none;
    border-radius: 28px;
    padding: 10px 38px;
    margin-bottom: 14px;
    cursor: pointer;
    width: 100%;
    transition: background 0.2s;
  }
  .logout-btn:hover {
    background: #5a3b7a;
  }
  .cancel-btn {
    background: #fff;
    color: #3a2658;
    font-family: "Istok Web-Regular", Helvetica;
    font-size: 1.25rem;
    border: none;
    border-radius: 28px;
    padding: 10px 38px;
    cursor: pointer;
    width: 100%;
    border: 2px solid #d4b1df;
    transition: background 0.2s, color 0.2s;
  }
  .cancel-btn:hover {
    background: #f3eaf7;
  }
  </style>