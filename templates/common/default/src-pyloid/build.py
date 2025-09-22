from pyloid_builder import create_spec_from_json, build_from_spec

def main():
    spec_path = create_spec_from_json('build_config.json')
    build_from_spec(spec_path)
    
if __name__ == "__main__":
    main()