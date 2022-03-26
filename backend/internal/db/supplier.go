package db

import "github.com/jmoiron/sqlx"

type supplierRepo struct {
	connection *sqlx.DB
}

type Supplier struct {
	Id      int64  `db:"id" json:"id"`
	Name    string `db:"name" json:"name"`
	Image   string `db:"image" json:"image"`
	Type    string `db:"type" json:"type"`
	OpenAt  string `db:"open_at" json:"openAt"`
	CloseAt string `db:"close_at" json:"closeAt"`
}

func (repo *supplierRepo) GetSuppliers() (suppliers []Supplier) {
	err := repo.connection.Select(&suppliers, "SELECT suppliers.id, suppliers.name, suppliers.image, st.name as type, suppliers.open_at, suppliers.close_at FROM suppliers JOIN supplier_types st on st.id = suppliers.type_id")
	if err != nil {
		panic(err)
	}
	return
}
