def decode_ksss_nb_code(ksss_nb_code: int) -> str:
    nb_name_map = {
        101: "Нефтебаза_1/СПБ",
        102: "Нефтебаза_2/Москва",
    }
    return nb_name_map.get(ksss_nb_code, "Неизвестная нефтебаза")

def decode_ksss_fuel_code(ksss_fuel_code: int) -> str:
    fuel_type_map = {
        95: "АИ-95",
        92: "АИ-92",
        100: "АИ-100",
        98: "АИ-98"
    }
    return fuel_type_map.get(ksss_fuel_code, "Неизвестное топливо")