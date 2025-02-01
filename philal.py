from ahc.hilal import hilal

hijri_year = 1446
hijri_month = 10       # syawal is 10th month in Hijri calendar
calculate_maps = True 
plus_1day = True
hl = hilal(hijri_year=hijri_year, hijri_month=hijri_month, calculate_maps=calculate_maps, plus_1day=plus_1day)
latitude = 5.83020000
longitude = 103.14080000
elevation = 15.0
time_zone_str = 'Asia/Kuala_Lumpur'
loc_name = 'Malaysia Kuala Terengganu, Terengganu'
hl.calculate_hilal_data(latitude, longitude, elevation, time_zone_str, loc_name=loc_name, delta_day=0)
hl.map_hilal_visibility('Odeh')
