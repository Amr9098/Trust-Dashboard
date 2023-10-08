
export interface ScheduleInterface {
    id:                 number;
    first_name:         string;
    last_name:          string;
    email:              null | string;
    phone:              null | string;
    ban:                boolean;
    verified:           boolean;
    created_at:         Date;
    number_of_products: number;
    user_products:      UserProduct[];
}

export interface UserProduct {
    id:          number;
    name:        string;
    description: string;
    image:       null | string;
    created_at:  Date;
}
