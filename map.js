const slugify = require("slugify")

const {v4} = require("uuid")
const { slugToBodyTypeIdMap } = require("./bodyTypeDetails")

const uuidV4 = v4
function mapper(data){
    return {
        car_id:uuidV4(),
        car_name:data.carName,
        slug:slugify(data.carName,{lower:true}),
        brand_id:"9c064082-4d1e-4763-bfac-d9a9e75d50fb",
        body_type_id:slugToBodyTypeIdMap['suv'],
        link:`/${slugify(data.carName,{lower:true})}`,
        description:data.description,
        total_variants:data.totalVariants,
        is_published:false,
        is_deleted:false,
    }
} 

function keyConverter(key){
  
  let newKey = key.replace('-', " ")
  let vkey = slugify(newKey,{replacement:"_",lower:true, strict: true,})
  if(vkey =='360_view_camera'){
    vkey = "view_360_camera"
  }
  if( vkey =="diesel_mileage_arai" || vkey=="petrol_mileage_arai"){
    vkey="mileage_arai"
  }
  if(vkey =="diesel_fuel_tank_capacity"||vkey =="petrol_fuel_tank_capacity"){
    vkey = "fuel_tank_capacity"
  }
  return vkey.replace("no","number")
}

function convertToObject(raw){
  const spec= {}
  for (const keys in raw) {   
    const obj = {}


    
    for (const key in raw[keys]) {
      
      
      obj[keyConverter(key)] = raw[keys][`${key}`]
      }
      spec[keyConverter(keys)] = {...obj}
    }

    return spec
    
}

// function variantMapper(rawData){
//   return{
//     variant_id:uuidV4(),
//     variant_name:rawData.variantName,
//     description:rawData.description,
//     slug:slugify(rawData.variantName,{lower:true}),
//     car_id:rawData.carId,
//     exshowroom_price:rawData.exShowroomPrice,
//      engine_and_transmission: {
//       engine_type: rawData['Engine & Transmission']?.['Engine Type'] || "",
//       displacement: rawData['Engine & Transmission']?.['Displacement'] || "",
//       max_power: rawData['Engine & Transmission']?.['Max Power'] || "",
//       max_torque: rawData['Engine & Transmission']?.['Max Torque'] || "",
//       number_of_cylinders: rawData['Engine & Transmission']?.['No. of Cylinders'] || "",
//       valves_per_cylinder: rawData['Engine & Transmission']?.['Valves Per Cylinder'] || "",
//       valve_configuration: rawData['Engine & Transmission']?.['Valve Configuration'] || "",
//       fuel_supply_system: rawData['Engine & Transmission']?.['Fuel Supply System'] || "",
//       turbo_charger: rawData['Engine & Transmission']?.['Turbo Charger'] || false,
//       transmission_type: rawData['Engine & Transmission']?.['Transmission Type'] || "",
//       gearbox: rawData['Engine & Transmission']?.['Gearbox'] || "",
//       drive_type: rawData['Engine & Transmission']?.['Drive Type'] || "",
//       hybrid_type: rawData['Engine & Transmission']?.['Hybrid Type'] || "",
//       super_charge: rawData['Engine & Transmission']?.['Super Charge'] || false,
//       regenerative_braking: rawData['Engine & Transmission']?.['Regenerative Braking'] || false,
//       },
//       fuel_and_performance: {
//         fuel_type: rawData['Fuel & Performance']?.['Fuel Type'] || "",
//   mileage_arai: rawData['Fuel & Performance']?.['Petrol Mileage ARAI'] || "",
//   fuel_tank_capacity: rawData['Fuel & Performance']?.['Petrol Fuel Tank Capacity'] || "",
//   emission_norm_compliance: rawData['Fuel & Performance']?.['Emission Norm Compliance'] || "",
//   top_speed: rawData['Fuel & Performance']?.['Top Speed'] || "",
//   secondary_fuel_type: rawData['Fuel & Performance']?.['Secondary Fuel Type'] || "",
//   highway_mileage: rawData['Fuel & Performance']?.['Highway Mileage'] || "",
//       },
//       suspension_steering_and_brakes: {
//         front_suspension: rawData['Suspension, Steering & Brakes']?.['Front Suspension'] || "",
//   rear_suspension: rawData['Suspension, Steering & Brakes']?.['Rear Suspension'] || "",
//   steering_type: rawData['Suspension, Steering & Brakes']?.['Steering Type'] || "",
//   steering_column: rawData['Suspension, Steering & Brakes']?.['Steering Column'] || "",
//   turning_radius: rawData['Suspension, Steering & Brakes']?.['Turning Radius'] || "",
//   front_brake_type: rawData['Suspension, Steering & Brakes']?.['Front Brake Type'] || "",
//   rear_brake_type: rawData['Suspension, Steering & Brakes']?.['Rear Brake Type'] || "",
//   alloy_wheel_size_front: rawData['Suspension, Steering & Brakes']?.['Alloy Wheel Size Front'] || "",
//   alloy_wheel_size_rear: rawData['Suspension, Steering & Brakes']?.['Alloy Wheel Size Rear'] || "",
//   acceleration: rawData['Suspension, Steering & Brakes']?.['Acceleration'] || "",
//   zero_to_hundred_kmph: rawData['Suspension, Steering & Brakes']?.['0-100 kmph'] || "",
//       },
//       dimensions_and_capacity: {
//         length: rawData['Dimensions & Capacity']?.['Length'] || "",
//   width: rawData['Dimensions & Capacity']?.['Width'] || "",
//   height: rawData['Dimensions & Capacity']?.['Height'] || "",
//   boot_space: rawData['Dimensions & Capacity']?.['Boot Space'] || "",
//   gross_weight: rawData['Dimensions & Capacity']?.['Gross Weight'] || "",
//   kerb_weight: rawData['Dimensions & Capacity']?.['Kerb Weight'] || "",
//   seating_capacity: rawData['Dimensions & Capacity']?.['Seating Capacity'] || "",
//   ground_clearance_unladen: rawData['Dimensions & Capacity']?.['Ground Clearance Unladen'] || "",
//   wheel_base: rawData['Dimensions & Capacity']?.['Wheel Base'] || "",
//   number_of_doors: rawData['Dimensions & Capacity']?.['No. of Doors'] || "",
//   reported_boot_space: rawData['Dimensions & Capacity']?.['Reported Boot Space'] || "",
//       },
//       comfort_and_convenience: {
//         power_steering: rawData['Comfort & Convenience']?.['Power Steering'] || false,
//         air_conditioner: rawData['Comfort & Convenience']?.['Air Conditioner'] || false,
//         heater: rawData['Comfort & Convenience']?.['Heater'] || false,
//         adjustable_steering: rawData['Comfort & Convenience']?.['Adjustable Steering'] || false,
//         height_adjustable_driver_seat: rawData['Comfort & Convenience']?.['Height Adjustable Driver Seat'] || false,
//         ventilated_seats: rawData['Comfort & Convenience']?.['Ventilated Seats'] || false,
//         electric_adjustable_seats: rawData['Comfort & Convenience']?.['Electric Adjustable Seats'] || "",
//         automatic_climate_control: rawData['Comfort & Convenience']?.['Automatic Climate Control'] || false,
//         accessory_power_outlet: rawData['Comfort & Convenience']?.['Accessory Power Outlet'] || false,
//         trunk_light: rawData['Comfort & Convenience']?.['Trunk Light'] || false,
//         vanity_mirror: rawData['Comfort & Convenience']?.['Vanity Mirror'] || false,
//         rear_reading_lamp: rawData['Comfort & Convenience']?.['Rear Reading Lamp'] || false,
//         adjustable_headrest: rawData['Comfort & Convenience']?.['Adjustable Headrest'] || false,
//         rear_seat_centre_arm_rest: rawData['Comfort & Convenience']?.['Rear Seat Centre Arm Rest'] || false,
//         height_adjustable_front_seat_belts: rawData['Comfort & Convenience']?.['Height Adjustable Front Seat Belts'] || false,
//         rear_ac_vents: rawData['Comfort & Convenience']?.['Rear AC Vents'] || false,
//         cruise_control: rawData['Comfort & Convenience']?.['Cruise Control'] || false,
//         parking_sensors: rawData['Comfort & Convenience']?.['Parking Sensors'] || "",
//         foldable_rear_seat: rawData['Comfort & Convenience']?.['Foldable Rear Seat'] || "",
//         keyless_entry: rawData['Comfort & Convenience']?.['Keyless Entry'] || false,
//         engine_start_stop_button: rawData['Comfort & Convenience']?.['Engine Start/Stop Button'] || false,
//         cooled_glovebox: rawData['Comfort & Convenience']?.['Cooled Glovebox'] || false,
//         voice_commands: rawData['Comfort & Convenience']?.['Voice Commands'] || false,
//         paddle_shifters: rawData['Comfort & Convenience']?.['Paddle Shifters'] || false,
//         usb_charger: rawData['Comfort & Convenience']?.['USB Charger'] || "",
//         central_console_armrest: rawData['Comfort & Convenience']?.['Central Console Armrest'] || "",
//         hands_free_tailgate: rawData['Comfort & Convenience']?.['Hands Free Tailgate'] || false,
//         drive_modes: rawData['Comfort & Convenience']?.['Drive Modes'] || "",
//         idle_start_stop_system: rawData['Comfort & Convenience']?.['Idle Start-Stop System'] || false,
//         rear_window_sunblind: rawData['Comfort & Convenience']?.['Rear Window Sunblind'] || false,
//         automatic_headlamps: rawData['Comfort & Convenience']?.['Automatic Headlamps'] || false,
//         follow_me_home_headlamps: rawData['Comfort & Convenience']?.['Follow Me Home Headlamps'] || false,
//         additional_features: rawData['Comfort & Convenience']?.['Additional Features'] || "",
//         voice_assisted_sunroof: rawData['Comfort & Convenience']?.['Voice Assisted Sunroof'] || false,
//         drive_mode_types: rawData['Comfort & Convenience']?.['Drive Mode Types'] || "",
//         power_windows: rawData['Comfort & Convenience']?.['Power Windows'] || "",
//         remote_trunk_opener: rawData['Comfort & Convenience']?.['Remote Trunk Opener'] || false,
//         remote_fuel_lid_opener: rawData['Comfort & Convenience']?.['Remote Fuel Lid Opener'] || false,
//         low_fuel_warning_light: rawData['Comfort & Convenience']?.['Low Fuel Warning Light'] || false,
//         rear_seat_headrest: rawData['Comfort & Convenience']?.['Rear Seat Headrest'] || false,
//         lumbar_support: rawData['Comfort & Convenience']?.['Lumbar Support'] || false,
//         navigation_system: rawData['Comfort & Convenience']?.['Navigation System'] || false,
//         smart_access_card_entry: rawData['Comfort & Convenience']?.['Smart Access Card Entry'] || false,
//         key_less_entry: rawData['Comfort & Convenience']?.['Key Less Entry'] || false,
//         tailgate_ajar_warning: rawData['Comfort & Convenience']?.['Tailgate Ajar Warning'] || false,
//         gear_shift_indicator: rawData['Comfort & Convenience']?.['Gear Shift Indicator'] || false,
//         rear_curtain: rawData['Comfort & Convenience']?.['Rear Curtain'] || false,
//         luggage_hook_and_net: rawData['Comfort & Convenience']?.['Luggage Hook and Net'] || false,
//         battery_saver: rawData['Comfort & Convenience']?.['Battery Saver'] || false,
//         lane_change_indicator: rawData['Comfort & Convenience']?.['Lane Change Indicator'] || false,
//       },
//       interior: {
//         tachometer: rawData['Interior']?.['Tachometer'] || false,
//   glove_box: rawData['Interior']?.['Glove Box'] || false,
//   digital_odometer: rawData['Interior']?.['Digital Odometer'] || false,
//   dual_tone_dashboard: rawData['Interior']?.['Dual Tone Dashboard'] || false,
//   additional_features: rawData['Interior']?.['Additional Features'] || "",
//   digital_cluster: rawData['Interior']?.['Digital Cluster'] || "",
//   digital_cluster_size: rawData['Interior']?.['Digital Cluster Size'] || "",
//   upholstery: rawData['Interior']?.['Upholstery'] || "",
//   electronic_multi_tripmeter: rawData['Interior']?.['Electronic Multi Tripmeter'] || false,
//   leather_seats: rawData['Interior']?.['Leather Seats'] || false,
//   leather_wrapped_steering_wheel: rawData['Interior']?.['Leather Wrapped Steering Wheel'] || false,
//   digital_clock: rawData['Interior']?.['Digital Clock'] || false,
//   outside_temperature_display: rawData['Interior']?.['Outside Temperature Display'] || false,
//   cigarette_lighter: rawData['Interior']?.['Cigarette Lighter'] || false,
//   driving_experience_control_eco: rawData['Interior']?.['Driving Experience Control Eco'] || false,
//   folding_table_in_the_rear: rawData['Interior']?.['Folding Table in the Rear'] || false,
//       },
//       exterior: {
//         adjustable_headlamps: rawData['Exterior']?.['Adjustable Headlamps'] || false,
//         rain_sensing_wiper: rawData['Exterior']?.['Rain Sensing Wiper'] || false,
//         automatic_headlamps: rawData['Exterior']?.['Automatic Headlamps'] || false,
//         orvm: rawData['Exterior']?.['ORVM'] || "",
//         led_fog_lamps: rawData['Exterior']?.['LED Fog Lamps'] || false,
//         rear_window_wiper: rawData['Exterior']?.['Rear Window Wiper'] || false,
//         rear_window_washer: rawData['Exterior']?.['Rear Window Washer'] || false,
//         rear_window_defogger: rawData['Exterior']?.['Rear Window Defogger'] || false,
//         wheel_covers: rawData['Exterior']?.['Wheel Covers'] || false,
//         alloy_wheels: rawData['Exterior']?.['Alloy Wheels'] || false,
//         rear_spoiler: rawData['Exterior']?.['Rear Spoiler'] || false,
//         outside_rear_view_mirror_turn_indicators: rawData['Exterior']?.['Outside Rear View Mirror Turn Indicators'] || false,
//         integrated_antenna: rawData['Exterior']?.['Integrated Antenna'] || false,
//         projector_headlamps: rawData['Exterior']?.['Projector Headlamps'] || false,
//         roof_rails: rawData['Exterior']?.['Roof Rails'] || false,
//         antenna: rawData['Exterior']?.['Antenna'] || "",
//         boot_opening: rawData['Exterior']?.['Boot Opening'] || "",
//         puddle_lamps: rawData['Exterior']?.['Puddle Lamps'] || false,
//         outside_rear_view_mirror: rawData['Exterior']?.['Outside Rear View Mirror'] || "",
//         tyre_size: rawData['Exterior']?.['Tyre Size'] || "",
//         tyre_type: rawData['Exterior']?.['Tyre Type'] || "",
//         led_drls: rawData['Exterior']?.['LED DRLs'] || false,
//         led_headlamps: rawData['Exterior']?.['LED Headlamps'] || false,
//         led_taillights: rawData['Exterior']?.['LED Taillights'] || false,
//         fog_lights_front: rawData['Exterior']?.['Fog Lights Front'] || false,
//         fog_lights_rear: rawData['Exterior']?.['Fog Lights Rear'] || false,
//         power_antenna: rawData['Exterior']?.['Power Antenna'] || false,
//         tinted_glass: rawData['Exterior']?.['Tinted Glass'] || false,
//         roof_carrier: rawData['Exterior']?.['Roof Carrier'] || false,
//         side_stepper: rawData['Exterior']?.['Side Stepper'] || false,
//         chrome_grille: rawData['Exterior']?.['Chrome Grille'] || false,
//         chrome_garnish: rawData['Exterior']?.['Chrome Garnish'] || false,
//         smoke_headlamps: rawData['Exterior']?.['Smoke Headlamps'] || false,
//         trunk_opener: rawData['Exterior']?.['Trunk Opener'] || "",
//         heated_wing_mirror: rawData['Exterior']?.['Heated Wing Mirror'] || false,
//         sun_roof: rawData['Exterior']?.['Sunroof'] || false,
//         additional_features: rawData['Exterior']?.['Additional Features'] || "",
//       },
//       safety: {
//         anti_lock_braking_system: rawData['Safety']?.['Anti-lock Braking System (ABS)'] || false,
//         central_locking: rawData['Safety']?.['Central Locking'] || false,
//         child_safety_locks: rawData['Safety']?.['Child Safety Locks'] || false,
//         anti_theft_alarm: rawData['Safety']?.['Anti Theft Alarm'] || false,
//         number_of_airbags: rawData['Safety']?.['No. of Airbags'] || "",
//         driver_airbag: rawData['Safety']?.['Driver Airbag'] || false,
//         passenger_airbag: rawData['Safety']?.['Passenger Airbag'] || false,
//         side_airbag: rawData['Safety']?.['Side Airbag'] || false,
//         side_airbag_rear: rawData['Safety']?.['Side Airbag Rear'] || false,
//         day_and_night_rear_view_mirror: rawData['Safety']?.['Day & Night Rear View Mirror'] || false,
//         rear_camera: rawData['Safety']?.['Rear Camera'] || false,
//         rear_sensors: rawData['Safety']?.['Rear Sensors'] || false,
//         crash_sensor: rawData['Safety']?.['Crash Sensor'] || false,
//         rear_wheel_drive: rawData['Safety']?.['Rear Wheel Drive'] || false,
//         speed_sensing_auto_door_lock: rawData['Safety']?.['Speed Sensing Auto Door Lock'] || false,
//         engine_immobilizer: rawData['Safety']?.['Engine Immobilizer'] || false,
//         electronic_stability_program: rawData['Safety']?.['Electronic Stability Program'] || false,
//         traction_control: rawData['Safety']?.['Traction Control'] || false,
//         hill_assist: rawData['Safety']?.['Hill Assist'] || false,
//         impact_sensing_auto_door_unlock: rawData['Safety']?.['Impact Sensing Auto Door Unlock'] || false,
//         view_camera_360: rawData['Safety']?.['360 View Camera'] || false,
//         brake_assist: rawData['Safety']?.['Brake Assist'] || false,
//         xenon_headlamps: rawData['Safety']?.['Xenon Headlamps'] || false,
//         heads_up_display_hud: rawData['Safety']?.['Heads Up Display HUD'] || false,
//         hill_descent_control: rawData['Safety']?.['Hill Descent Control'] || false,
//         global_ncap_safety_rating: rawData['Safety']?.['Global NCAP Safety Rating'] || 'N/A',
//       },

//       entertainment_and_communication: {
//         radio: rawData['Entertainment & Communication']?.['Radio'] || false,
//         integrated_2din_audio: rawData['Entertainment & Communication']?.['Integrated 2DIN Audio'] || false,
//         wireless_phone_charging: rawData['Entertainment & Communication']?.['Wireless Phone Charging'] || false,
//         bluetooth_connectivity: rawData['Entertainment & Communication']?.['Bluetooth Connectivity'] || false,
//         touchscreen: rawData['Entertainment & Communication']?.['Touchscreen'] || false,
//         touchscreen_size: rawData['Entertainment & Communication']?.['Touchscreen Size'] || 'N/A',
//         connectivity: rawData['Entertainment & Communication']?.['Connectivity'] || 'N/A',
//         android_auto: rawData['Entertainment & Communication']?.['Android Auto'] || false,
//         apple_car_play: rawData['Entertainment & Communication']?.['Apple CarPlay'] || false,
//         number_of_speakers: rawData['Entertainment & Communication']?.['No. of Speakers'] || 'N/A',
//         usb_ports: rawData['Entertainment & Communication']?.['Usb Ports'] || false,
//         inbuilt_apps: rawData['Entertainment & Communication']?.['Inbuilt Apps'] || 'N/A',
//         tweeters: rawData['Entertainment & Communication']?.['Tweeters'] || 'N/A',
//         subwoofer: rawData['Entertainment & Communication']?.['Subwoofer'] || 'N/A',
//         additional_features: rawData['Entertainment & Communication']?.['Additional Features'] || 'N/A',
//         audio_system_remote_control: rawData['Entertainment & Communication']?.['Audio System Remote Control'] || false,
//         mirror_link: rawData['Entertainment & Communication']?.['Mirror Link'] || false,
//         usb_and_auxiliary_input: rawData['Entertainment & Communication']?.['USB and Auxiliary Input'] || false,
//         wi_fi_connectivity: rawData['Entertainment & Communication']?.['Wi-Fi Connectivity'] || false,
//         compass: rawData['Entertainment & Communication']?.['Compass'] || false,
//         speakers: rawData['Entertainment & Communication']?.['Speakers'] || 'N/A',
//     },
//       adas_feature: {
//         forward_collision_warning: rawData['ADAS Feature']?.['Forward Collision Warning'] || false,
//         blind_spot_collision_avoidance_assist: rawData['ADAS Feature']?.['Blind Spot Collision Avoidance Assist'] || false,
//         lane_departure_warning: rawData['ADAS Feature']?.['Lane Departure Warning'] || false,
//         lane_keep_assist: rawData['ADAS Feature']?.['Lane Keep Assist'] || false,
//         driver_attention_warning: rawData['ADAS Feature']?.['Driver Attention Warning'] || false,
//         adaptive_cruise_control: rawData['ADAS Feature']?.['Adaptive Cruise Control'] || false,
//         leading_vehicle_departure_alert: rawData['ADAS Feature']?.['Leading Vehicle Departure Alert'] || false,
//         adaptive_high_beam_assist: rawData['ADAS Feature']?.['Adaptive High Beam Assist'] || false,
//         rear_cross_traffic_alert: rawData['ADAS Feature']?.['Rear Cross Traffic Alert'] || false,
//         rear_cross_traffic_collision_avoidance_assist: rawData['ADAS Feature']?.['Rear Cross Traffic Collision Avoidance Assist'] || false,
//         blind_spot_monitor: rawData['ADAS Feature']?.['Blind Spot Monitor'] || false,
//       },
//       advanced_internet_feature: {
//         live_location: rawData?.["Advanced Internet Feature"]?.["Live location"] || false,
//         over_the_air_updates: rawData?.["Advanced Internet Feature"]?.["Over The Air Updates"] || false,
//         google_alexa_connectivity: rawData?.["Advanced Internet Feature"]?.["Google Alexa Connectivity"] || false,
//         inbuilt_apps: rawData?.["Advanced Internet Feature"]?.["Inbuilt Apps"] || false,
//         remote_immobiliser: rawData?.["Advanced Internet Feature"]?.["Remote Immobiliser"] || false,
//         digital_car_key: rawData?.["Advanced Internet Feature"]?.["Digital Car Key"] || false,
//         navigation_with_live_traffic: rawData?.["Advanced Internet Feature"]?.["Navigation with Live Traffic"] || false,
//         send_poi_to_vehicle_from_app: rawData?.["Advanced Internet Feature"]?.["Send POI to Vehicle from App"] || false,
//         live_weather: rawData?.["Advanced Internet Feature"]?.["Live Weather"] || false,
//         e_call_and_i_call: rawData?.["Advanced Internet Feature"]?.["E-Call & I-Call"] || false,
//         sos_button: rawData?.["Advanced Internet Feature"]?.["SOS Button"] || false,
//         rsa: rawData?.["Advanced Internet Feature"]?.["RSA"] || false,
//         over_speeding_alert: rawData?.["Advanced Internet Feature"]?.["Over Speeding Alert"] || false,
//         tow_away_alert: rawData?.["Advanced Internet Feature"]?.["Tow Away Alert"] || false,
//         smartwatch_app: rawData?.["Advanced Internet Feature"]?.["Smartwatch App"] || false,
//         valet_mode: rawData?.["Advanced Internet Feature"]?.["Valet Mode"] || false,
//         emergency_assistance: rawData?.["Advanced Internet Feature"]?.["SOS / Emergency Assistance"] || false,
//         geo_fence_alert: rawData?.["Advanced Internet Feature"]?.["Geo Fence Alert"] || false,
//       },
//       registration_and_charges: {
//         individual_registration: "",
//         insurance: "",
//         other_charges: "",
//       },
//       warranty_and_features: {
//         manufacturer_warranty: "",
//         battery_warranty_years: "",
//         warranty_years: "",
//       },
//   }
// }

function variantMapper(rawData){
 
  
  return{
    variant_id:uuidV4(),
    variant_name:rawData.variantName,
    description:rawData.description,
    slug:slugify(rawData.variantName,{lower:true}),
    car_id:rawData.carId,
    exshowroom_price:rawData.exShowroomPrice,
    specification:{...convertToObject(rawData.specification)}
  }
}


module.exports ={mapper,variantMapper}