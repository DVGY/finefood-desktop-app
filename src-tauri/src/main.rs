// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, Menu, Submenu};
use tauri::WindowMenuEvent;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn handle_menu_event(event: WindowMenuEvent)  {
   
    print!("{:?}",event);

    match event.menu_item_id() {
        "quit" => {
          std::process::exit(0);
        }
        "close" => {
          // do something with other events
          event.window().close().unwrap();
        }
        _ => {}
      }

}

fn createmenu() -> Menu {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let close = CustomMenuItem::new("close".to_string(), "Close");
    let zoom_in = CustomMenuItem::new("zoom_in".to_string(), "Zoom In");
    let zoom_out = CustomMenuItem::new("zoom_out".to_string(), "Zoom Out");
    let reset_zoom = CustomMenuItem::new("reset_zoom".to_string(), "Reset Zoom");
    let check_for_updates = CustomMenuItem::new("check_for_updates".to_string(), "Check for Updates");
    let about = CustomMenuItem::new("about".to_string(), "About");
    
    let file_submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));
    let view_submenu = Submenu::new("View", Menu::new().add_item(zoom_in).add_item(zoom_out).add_item(reset_zoom));
    let help_submenu = Submenu::new("Help", Menu::new().add_item(check_for_updates).add_item(about));
    
     Menu::new()
      .add_submenu(file_submenu)
      .add_submenu(view_submenu)
      .add_submenu(help_submenu) 

}


fn main() {
    

    tauri::Builder::default()
        .menu(createmenu())
        .on_menu_event(|event| {
            handle_menu_event(event)
          })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


