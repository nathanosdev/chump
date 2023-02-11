#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod agent;
mod commands;

use crate::commands::canister_http_request;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![canister_http_request])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
